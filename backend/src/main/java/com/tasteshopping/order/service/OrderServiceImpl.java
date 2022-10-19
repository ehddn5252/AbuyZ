package com.tasteshopping.order.service;

import com.tasteshopping.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository orderRepository;
    @Override
    public Integer getLastOrder() {

        return null;
    }
}
