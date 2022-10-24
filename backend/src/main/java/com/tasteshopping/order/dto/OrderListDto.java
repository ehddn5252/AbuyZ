package com.tasteshopping.order.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderListDto {
    Integer uid;
    Integer totalPrice;
    Date date;
    String userEmail;
    String Status;
    String day;


}
