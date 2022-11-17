package com.tasteshopping.dashboard.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class CountAndPriceDto {
    Long totalCount;
    Long totalPrice;
    public CountAndPriceDto(Long totalCount, Long totalPrice){
        this.totalCount = totalCount;
        this.totalPrice = totalPrice;
    }
}
