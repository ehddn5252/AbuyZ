package com.tasteshopping.order.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderCancelReqDto {
    Integer order_list_uid;
}
