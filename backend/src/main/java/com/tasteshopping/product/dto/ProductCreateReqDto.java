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
    String description_img;
    String rep_img;
    LinkedHashMap<String,String> imgs;
    LinkedHashMap<String,String> options;
    String keywords;
    Integer products_uid;
    Integer count;
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
                .descriptionImg(p.description_img)
                .repImg(p.rep_img)
                .options(p.options)
                .keywords(p.keywords)
                .productsUid(p.products_uid)
                .build();

    }

}
