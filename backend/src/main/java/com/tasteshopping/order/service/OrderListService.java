package com.tasteshopping.order.service;

import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.order.entity.OrderLists;

import java.util.List;

public interface OrderListService {
    List<OrderListDto> getOrderLists(String email);
}
