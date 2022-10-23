package com.tasteshopping.cart.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;

import java.util.List;

public interface CartService {
    void putCart(CartDto cartsDto);

    void deleteCart(int cartsUid);

    List<CartResDto> getCart(Integer usersUid);
}
