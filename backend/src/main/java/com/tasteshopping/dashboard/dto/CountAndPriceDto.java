package com.tasteshopping.dashboard.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class CountAndPriceDto {
    int totalCount;
    int totalPrice;
    public CountAndPriceDto(int totalCount, int totalPrice){
        this.totalPrice = totalPrice;
        this.totalCount = totalCount;
    }
}
