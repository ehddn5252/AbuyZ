package com.tasteshopping.order.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository orderRepository;
    @Override
    public Integer getLastOrder() {

        return null;
    }

    @Override
    public void cartPay(List<CartResDto> cartDtoList) {
        // cartDtoList to orderDtoList
        List<OrderDto> orderDtoList = new ArrayList<>();
        for(int i=0;i<cartDtoList.size();++i){

        }
    }
}
