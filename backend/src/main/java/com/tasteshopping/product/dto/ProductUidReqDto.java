package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductUidReqDto {
    private int products_uid;

    public ProductUidDto toDto(){
        ProductUidDto p = new ProductUidDto();
        p.setProductsUid(products_uid);
        return p;
    }
}
