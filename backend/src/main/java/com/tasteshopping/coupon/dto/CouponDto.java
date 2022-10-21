package com.tasteshopping.coupon.dto;

import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.product.entity.BigCategories;
import lombok.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponDto {
    private String name;
    private int discount_price;
    private String start_date;
    private String end_date;
    private int big_categories_uid;

    public Coupons toEntity(BigCategories bigCategories){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return Coupons.builder()
                    .startDate(formatter.parse(this.start_date))
                    .endDate(formatter.parse(this.end_date))
                    .name(this.name)
                    .bigCategories(bigCategories)
                    .discountPrice(this.discount_price)
                    .build();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
