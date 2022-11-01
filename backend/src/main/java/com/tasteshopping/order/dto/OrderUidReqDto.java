package com.tasteshopping.order.dto;

import com.tasteshopping.order.entity.ProcessStatuses;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderUidReqDto {
    Integer order_uid;
    String status;
}
