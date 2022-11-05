package com.tasteshopping.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.TreeMap;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartBigCategoryDto implements Comparable<CartBigCategoryDto>{
    private TreeMap<String,CartSmallCategoryDto> small_category;
    private int total_count;
    public void updateCount(int count){
        this.total_count+= count;
    }
    @Override
    public int compareTo(CartBigCategoryDto cartBigCategoryDto) {
        return cartBigCategoryDto.getTotal_count()-this.total_count;
    }
}
