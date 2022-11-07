package com.tasteshopping.cart.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.common.dto.BaseRes;

import java.util.List;

public interface CartService {
    BaseRes putCart(String email, CartDto cartsDto);

    BaseRes deleteCart(String email, int cartsUid);

    List<CartResDto> getCart(String email);

}
