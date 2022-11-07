package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductPictureDto {
    private int uid;
    private String imgUrl;
    private int productsUid;
}
