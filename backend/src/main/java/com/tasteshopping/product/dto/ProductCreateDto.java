package com.tasteshopping.product.dto;

import lombok.*;

import java.util.LinkedHashMap;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateDto {
    String userId;
    Integer smallCategoriesUid;
    String name;
    Integer discountRate;
    Integer price;
    Integer deliveryFee;
    String brandName;
    String decsriptionImg;
    String repImg;
    LinkedHashMap<String,String> imgs;
    LinkedHashMap<String,String> options;
    String keywords;
    String metaTag;

     public static ProductCreateDto reqToDto(ProductCreateReqDto p){
         return ProductCreateDto
                 .builder()
                 .userId(p.user_id)
                 .smallCategoriesUid(p.small_categories_uid)
                 .name(p.name)
                 .discountRate(p.discount_rate)
                 .price(p.price)
                 .deliveryFee(p.delivery_fee)
                 .brandName(p.brand_name)
                 .decsriptionImg(p.decsription_img)
                 .repImg(p.rep_img)
                 .imgs(p.imgs)
                 .options(p.options)
                 .keywords(p.keywords)
                 .metaTag(p.meta_tag)
                 .build();

     }
}
