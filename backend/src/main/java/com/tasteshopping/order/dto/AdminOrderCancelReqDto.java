package com.tasteshopping.order.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AdminOrderCancelReqDto {

    List<Integer> order_uids;
}
