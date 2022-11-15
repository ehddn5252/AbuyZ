package com.tasteshopping.order.dto;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CouponListDto {

    ArrayList<Integer> coupons;
}
