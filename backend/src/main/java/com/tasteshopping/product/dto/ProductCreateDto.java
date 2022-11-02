package com.tasteshopping.product.dto;

import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.categories.entity.SmallCategories;
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
    Integer productsUid;
    Integer smallCategoriesUid;
    String name;
    Integer discountRate;
    Float reviewRate;
    Integer price;
    Integer deliveryFee;
    String brandName;
    String descriptionImg;
    String repImg;
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
                 .descriptionImg(p.description_img)
                 .repImg(p.rep_img)
                 .options(p.options)
                 .keywords(p.keywords)
                 .metaTag(p.meta_tag)
                 .productsUid(p.products_uid)
                 .build();
     }

     public static Products toEntity(ProductCreateDto p, Brands brand, SmallCategories smallCategory){
         return Products.builder()
                 .reviewRate(p.getReviewRate())
                 .deliveryFee(p.getDeliveryFee())
                 .discountRate(p.discountRate)
                 .descriptionImg(p.descriptionImg)
                 .price(p.price)
                 .smallCategory(smallCategory)
                 .brand(brand)
                 .repImg(p.repImg)
                 .name(p.name)
                 .status("selling")
                 .build();
     }
}
