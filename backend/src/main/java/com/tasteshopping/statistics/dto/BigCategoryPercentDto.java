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
public class BigCategoryPercentDto implements Comparable<BigCategoryPercentDto>{
    private TreeMap<String,SmallCategoryPercentDto> small_category;
    private double percent;
    private int total_sales;
    public void updateTotalSales(int sale){
        this.total_sales += sale;
    }
    @Override
    public int compareTo(BigCategoryPercentDto bigCategoryPercentDto) {
        return bigCategoryPercentDto.getTotal_sales()-this.total_sales;
    }
}
