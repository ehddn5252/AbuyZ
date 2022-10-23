package com.tasteshopping.order.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;

import java.util.List;

public interface OrderService {
    public Integer getLastOrder();

    public void cartPay(List<CartResDto> cartDto);
}
