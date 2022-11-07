package com.tasteshopping.cart.dto;

import lombok.*;

import java.util.LinkedHashMap;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {

    private Integer productsUid;
    private Integer productCount;
    private LinkedHashMap<String,String> optionValues;
    private Integer inventoriesUid;
}
