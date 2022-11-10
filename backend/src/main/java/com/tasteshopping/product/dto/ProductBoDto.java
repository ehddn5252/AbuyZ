package com.tasteshopping.product.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductBoDto {

    private String name;
    private Integer price;
    private Integer discountRate;
    private String repImg;
    private String descriptionImg;
    private Float reviewRate;
    private Integer uid;

    private Integer deliveryFee;

    private String smallCategoryName;
    private String bigCategoryName;
    private Integer bigCategoryUid;

    private String brandName;

    private Date date;
    private String status;
    private Integer reviewNum;
    private Integer inventoryNum;
    private List<String> productKeywords;
}
