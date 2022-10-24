package com.tasteshopping.order.service;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
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

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        LocalDateTime dateTime = LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.BASIC_ISO_DATE), formatter);
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        String caseStartDate = dateFormat.format(LocalDateTime.now());

        LocalDateTime localdatetime = LocalDateTime.parse(caseStartDate, dateFormat);
        orderLists.setDate(null);
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
            orderRepository.save(orders);
            totalPrice += products.getPrice() * cart.getProductCount();
//            OrderDto orderDto = new OrderDto();
//            List<ProductOptionListDto> productOptionListDtoList = new ArrayList<>();
//            List<ProductOptionLists> productOptionListsList = productOptions.getProductOptionLists();
//            for(int j=0;j<productOptionListsList.size();++i){
//                productOptionListDtoList.add(productOptionListsList.get(i).toDto());
//            }
//            orderDto.setProductOptionListDtoList(productOptionListDtoList);
        }
        orderLists.setStatus(Status.PROCESS.toString());
        orderLists.setTotalPrice(totalPrice);
        orderListRepository.save(orderLists);
    }
}
