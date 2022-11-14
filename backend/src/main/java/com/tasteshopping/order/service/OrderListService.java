package com.tasteshopping.order.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.dto.OrderListDto;

import java.util.List;

public interface OrderListService {
    List<OrderListDto> getOrderLists(String email);

    BaseRes getOrderFromOrderListsUid(String email, int orderListUidReqDto);

    BaseRes getNoReviewOrder(String email);

    BaseRes getOrdersGroupByDate(String email);

    List<OrderListDto> getOrderListsWeek(String email);
}
