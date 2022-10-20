package com.tasteshopping.wish.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class WishProductDto {
    private Integer wish_uid;
    private String img_url;
    private Integer price;
    private Integer product_uid;
    private String product_name;
}
