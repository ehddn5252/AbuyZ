package com.tasteshopping.coupon.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponResListDto {
    private List<CouponResDto> result;
    private int count;
}
