package com.tasteshopping.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartSmallCategoryDto implements Comparable<CartSmallCategoryDto>{
    private String small_category_name;
    private int total_count;
    public void updateCount(int count){
        this.total_count+= count;
    }
    @Override
    public int compareTo(CartSmallCategoryDto cartSmallCategoryDto) {
        return cartSmallCategoryDto.getTotal_count()-this.total_count;
    }
}
