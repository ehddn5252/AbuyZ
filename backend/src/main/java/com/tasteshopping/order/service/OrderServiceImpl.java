package com.tasteshopping.order.service;

import com.tasteshopping.cart.exception.OutOfStockException;
import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.cart.service.CartService;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.dto.Status;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final OrderListRepository orderListRepository;

    private final CartService cartService;

    @Override
    public Integer getLastOrder() {

        return null;
    }


    @Override
    @Transactional
    public void cartPay(String email) {
        Users user =  userRepository.findByEmail(email).get();
        // 장바구니 가져와서 orderList 만들기
        List<Carts> cartList = cartRepository.findByUser(user);
        OrderLists orderLists = new OrderLists();
        orderLists.setUser(user);
        orderLists.setTotalPrice(0);
        orderLists.setDay(LocalDateTime.now().getDayOfWeek().toString());

//        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
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
        List<OrderLists> orderListsList = orderListRepository.findByDate(date);

        int totalPrice = 0;
        for(int i = 0; i< cartList.size(); ++i){
            Carts cart= cartList.get(i);
            Orders orders = new Orders();
            orders.setOrderList(orderListsList.get(0));
            orders.setCount(cart.getProductCount());
            orders.setStatus(Status.PROCESS.toString());
            Inventories inventory = cart.getInventory();
            orders.setPrice(inventory.getPrice());
            orders.setInventory(inventory);
            int remainingStoke = inventory.getCount()-cart.getProductCount();
            if(remainingStoke>=0) {
                inventory.setCount(remainingStoke);
            }
            else{
                throw new OutOfStockException();
            }
            orders.getInventory();
            totalPrice += inventory.getPrice() * cart.getProductCount();

            orderRepository.save(orders);
            cartRepository.delete(cart);
        }
        // 오늘 날짜 date 가져와서 만약에 있으면 가져와서 가격만 더해주고, 없으면 새로 생성해서 저장해준다.
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
        List<OrderLists> orderListsList = orderListRepository.findByDate(date);

        int totalPrice = 0;
        Carts cart= cartRepository.findByUserAndUid(user);
        Orders orders = new Orders();
        orders.setOrderList(orderListsList.get(0));
        orders.setCount(cart.getProductCount());
        orders.setStatus(Status.PROCESS.toString());
        Inventories inventory = cart.getInventory();
        orders.setPrice(inventory.getPrice());
        orders.setInventory(inventory);
        int remainingStoke = inventory.getCount()-cart.getProductCount();
        if(remainingStoke>=0) {
            inventory.setCount(remainingStoke);
        }
        else{
            throw new OutOfStockException();
        }
        orders.getInventory();
        totalPrice += inventory.getPrice() * cart.getProductCount();

        orderRepository.save(orders);
        cartRepository.delete(cart);
        orderLists.setStatus(Status.PROCESS.toString());
        orderLists.setTotalPrice(totalPrice);
        orderListRepository.save(orderLists);
    }


    @Override
    @Transactional
    public BaseRes orderCancel(Integer orderListUid) {
        OrderLists orderLists = orderListRepository.findById(orderListUid).get();
        if(orderLists.getStatus().equals("CANCEL_REQUEST")){
            orderLists.setStatus("CANCELED");
            orderListRepository.save(orderLists);
        }
        List<Orders> orders = orderRepository.findByOrderList(orderLists);
        for(int i=0;i< orders.size();++i){
            // 재고 다시 돌려 놓음
            orders.get(i).getInventory().setCount(orders.get(i).getInventory().getCount()+orders.get(i).getCount());
        }
        return null;
    }

    @Override
    public BaseRes orderRegisterCancel(Integer orderListUid) {
        // 여기에서 주문에 대한 상태를 바꿔주어야 한다.
        OrderLists orderLists = orderListRepository.findById(orderListUid).get();
        orderLists.setStatus("CANCEL_REQUEST");
        return null;
    }
}
