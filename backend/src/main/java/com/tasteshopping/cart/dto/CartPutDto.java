package com.tasteshopping.cart.dto;

import lombok.*;

import java.util.LinkedHashMap;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartPutDto {
    private Integer cartUid;
    private Integer productCount;
}
