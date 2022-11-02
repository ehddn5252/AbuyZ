package com.tasteshopping.cart.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.LinkedHashMap;

@ToString
@Getter
@Setter
public class CartReqDto {

    private Integer products_uid;
    private Integer product_count;
    private LinkedHashMap<String,String> option_values;
    private Integer users_uid;
    private Integer inventories_uid;

    public CartDto toDto(){
        CartDto cartsDto = new CartDto();
        cartsDto.setProductsUid(products_uid);
        cartsDto.setProductCount(product_count);
        cartsDto.setOptionValues(option_values);
        cartsDto.setInventoriesUid(inventories_uid);
        return cartsDto;
    }
}
