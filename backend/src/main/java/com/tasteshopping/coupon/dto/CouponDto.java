package com.tasteshopping.coupon.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.product.entity.BigCategories;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.YearMonth;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponDto {
    private String name;
    private int discount_price;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-DD", timezone = "Asia/Seoul")
    private LocalDateTime start_date;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-DD", timezone = "Asia/Seoul")
    private LocalDateTime end_date;

    public Coupons toEntity(){
        return Coupons.builder()

                .build();
    }
}
