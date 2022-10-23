package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductOptionDto {
    private Integer uid;
    private String name;
    private String value;
    private Integer optionPrice;
    private Integer productOptionsUid;
}
