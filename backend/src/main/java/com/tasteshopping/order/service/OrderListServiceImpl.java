package com.tasteshopping.order.service;

import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderListServiceImpl implements OrderListService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderListRepository orderListRepository;
    @Override
    public List<OrderLists> getOrderLists(String email) {
        Users user = userRepository.findByEmail(email).get();
        List<OrderLists> orderLists = orderListRepository.findByUsersUid(user.getUid());
        return orderLists;
    }
}
