package com.tasteshopping.cart.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Inventories;

import java.util.List;

public interface CartService {
    void putCart(String email, CartDto cartsDto);

    BaseRes deleteCart(String email, int cartsUid);

    List<CartResDto> getCart(String email);

}
