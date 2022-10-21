package com.tasteshopping.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartBigCategoryDto {
    private HashMap<String,CartSmallCategoryDto> small_category;
    private int total_count;
    public void updateCount(int count){
        this.total_count+= count;
    }
}
