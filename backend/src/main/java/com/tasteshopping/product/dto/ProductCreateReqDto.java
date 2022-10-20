package com.tasteshopping.product.dto;

import lombok.*;

import java.util.LinkedHashMap;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateReqDto {
    String user_id;
    Integer small_categories_uid;
    String name;
    Integer discount_rate;
    Integer price;
    Integer delivery_fee;
    String brand_name;
    String decsription_img;
    String rep_img;
    LinkedHashMap<String,String> imgs;
    LinkedHashMap<String,String> options;
    String keywords;
    String meta_tag;

}
