package com.tasteshopping.order.service;

import com.tasteshopping.order.entity.OrderLists;

import java.util.List;

public interface OrderListService {
    List<OrderLists> getOrderLists(String email);
}
