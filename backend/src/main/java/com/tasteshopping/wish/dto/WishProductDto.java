package com.tasteshopping.wish.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishProductDto {
    private Integer wish_uid;
    private String img_url;
    private Integer price;
    private Integer product_uid;
    private String product_name;
    private Integer discountRate;
}
