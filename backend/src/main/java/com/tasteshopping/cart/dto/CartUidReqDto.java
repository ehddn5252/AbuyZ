package com.tasteshopping.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartUidReqDto {
    private Integer carts_uid;

    public CartUidDto toDto(){
        CartUidDto cartUidDto = new CartUidDto();
        cartUidDto.setCartsUid(carts_uid);
        return cartUidDto;
    }
}
