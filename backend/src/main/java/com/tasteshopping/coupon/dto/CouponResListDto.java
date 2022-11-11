package com.tasteshopping.coupon.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponResListDto {
    private List<UserCouponResDto> result;
    private int count;
}
