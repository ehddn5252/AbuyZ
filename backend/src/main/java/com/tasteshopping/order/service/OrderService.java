package com.tasteshopping.order.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.common.dto.BaseRes;

import java.util.List;

public interface OrderService {
    void cartPay(String email, List<Integer> coupons);

//    void basicPay(String email, CartDto cartDto);
    void basicPay(String email, CartDto cartDto);

    BaseRes orderCancel(Integer orderUid);

    BaseRes orderRegisterCancel(List<Integer> orderListUid);

    BaseRes changeStatus(Integer order_uid, String status);

    BaseRes getStatus(String status);
    BaseRes getStatusNum(String status);

    Integer getNumByStatus(String status);
}
