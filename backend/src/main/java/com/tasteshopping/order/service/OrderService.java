package com.tasteshopping.order.service;

import com.tasteshopping.order.dto.OrderDto;

import java.util.List;

public interface OrderService {
    public Integer getLastOrder();

    void cartPay(String email);
}
