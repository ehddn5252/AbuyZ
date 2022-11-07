package com.tasteshopping.statistics.dto;

import lombok.*;

import java.util.TreeMap;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartStatisticsListDto{
    private TreeMap<String,CartBigCategoryDto>big_categories;
    private int total_count;
    public void update(String bigCategoryName,CartBigCategoryDto cartBigCategoryDto){
        this.big_categories.put(bigCategoryName,cartBigCategoryDto);
    }
}
