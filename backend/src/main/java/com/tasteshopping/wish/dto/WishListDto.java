package com.tasteshopping.wish.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class WishListDto {
    private List<WishProductDto> products;
    private int count;
    public void upProductCount(){
        this.count++;
    }
}
