package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductUidReqDto {
    private int products_uid;
    private String status;

}
