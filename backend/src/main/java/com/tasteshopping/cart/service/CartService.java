package com.tasteshopping.cart.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;

import java.util.List;

public interface CartService {
    void putCart(String email, CartDto cartsDto);

    void deleteCart(String email, int cartsUid);

    List<CartResDto> getCart(String email);
}
