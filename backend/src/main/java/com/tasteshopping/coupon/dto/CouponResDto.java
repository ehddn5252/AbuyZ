package com.tasteshopping.coupon.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponResDto {
    private int uid;
    private String name;
    private int discount_price;
    private String start_date;
    private String end_date;
    private int available_categories_uid;
    private String available_categories_name;
    private String status;

}
