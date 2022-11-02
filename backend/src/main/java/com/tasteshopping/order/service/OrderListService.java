package com.tasteshopping.order.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.order.dto.OrderListUidReqDto;
import com.tasteshopping.order.entity.OrderLists;

import java.util.List;

public interface OrderListService {
    List<OrderListDto> getOrderLists(String email);

    BaseRes getOrder(String email, int orderListUidReqDto);

    BaseRes getNoReviewOrder(String email);
}
