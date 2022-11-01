package com.tasteshopping.order.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.order.dto.OrderReqDto;

import java.util.List;

public interface OrderService {
    public Integer getLastOrder();

    void cartPay(String email);

    void basicPay(String email, CartDto cartDto);

    BaseRes orderCancel(Integer orderListUid);
}
