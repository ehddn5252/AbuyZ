package com.tasteshopping.order.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.cart.service.CartService;
import com.tasteshopping.order.dto.OrderReqDto;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.dto.Status;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    OrderListRepository orderListRepository;

    @Autowired
    CartService cartService;

    @Override
    public Integer getLastOrder() {

        return null;
    }

    @Override
    @Transactional
    public void cartPay(String email) {
        Users user =  userRepository.findByEmail(email).get();
        // 장바구니 가져와서 orderList 만들기
        List<Carts> l = cartRepository.findByUsersUid(user.getUid());
        OrderLists orderLists = new OrderLists();
        orderLists.setUser(user);
        orderLists.setTotalPrice(0);
        orderLists.setDay(LocalDateTime.now().getDayOfWeek().toString());

        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String s = formatter.format(date).toString();
        try{
            date = formatter.parse(s);
        }
        catch(ParseException pErr){
            System.out.println(pErr);
        }

        orderLists.setDate(date);
        orderListRepository.save(orderLists);

        // 이 과정을 줄일 수 있나?
        Integer uid = orderListRepository.findMaxUid();
        orderLists = orderListRepository.findById(uid).get();

        int totalPrice = 0;
        for(int i=0;i<l.size();++i){
            Carts cart= l.get(i);
            Orders orders = new Orders();
            orders.setOrderList(orderLists);
            orders.setCount(cart.getProductCount());
            orders.setStatus(Status.PROCESS.toString());

            Products products = cart.getProduct();
            orders.setPrice(products.getPrice());
            ProductOptions productOptions = cart.getProductOption();
            orders.setProduct(products);
            orders.setProductOptions(productOptions);
            totalPrice += products.getPrice() * cart.getProductCount();

            orderRepository.save(orders);
//            cartRepository.delete(cart);
        }
        orderLists.setStatus(Status.PROCESS.toString());
        orderLists.setTotalPrice(totalPrice);
        orderListRepository.save(orderLists);
    }

    @Override
    @Transactional
    public void basicPay(String email, CartDto cartDto) {
        /*
        1. 일반 결제하기 -> 카트에 넣고 카트 마지막꺼만 결제하는 방식으로?
         */

        cartService.putCart(email,cartDto);

        Users user =  userRepository.findByEmail(email).get();
        // 장바구니 가져와서 orderList 만들기
        List<Carts> l = cartRepository.findByUsersUid(user.getUid());
        OrderLists orderLists = new OrderLists();
        orderLists.setUser(user);
        orderLists.setTotalPrice(0);
        orderLists.setDay(LocalDateTime.now().getDayOfWeek().toString());


        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String s = formatter.format(date).toString();
        try{
            date = formatter.parse(s);
        }
        catch(ParseException pErr){
            System.out.println(pErr);
        }

        orderLists.setDate(date);
        orderListRepository.save(orderLists);

        // 이 과정을 줄일 수 있나?
        Integer uid = orderListRepository.findMaxUid();
        orderLists = orderListRepository.findById(uid).get();

        int totalPrice = 0;
        Carts cart= l.get(l.size()-1);
        Orders orders = new Orders();
        orders.setOrderList(orderLists);
        orders.setCount(cart.getProductCount());
        orders.setStatus(Status.PROCESS.toString());

        Products products = cart.getProduct();
        orders.setPrice(products.getPrice());
        ProductOptions productOptions = cart.getProductOption();
        orders.setProduct(products);
        orders.setProductOptions(productOptions);
        orderRepository.save(orders);

        totalPrice += products.getPrice() * cart.getProductCount();
        orderLists.setStatus(Status.PROCESS.toString());
        orderLists.setTotalPrice(totalPrice);
        orderListRepository.save(orderLists);
        // 장바구니에서 삭제
        cartRepository.delete(cart);
    }
}
