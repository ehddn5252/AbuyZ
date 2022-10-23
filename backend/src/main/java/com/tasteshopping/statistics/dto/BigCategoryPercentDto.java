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
public class BigCategoryPercentDto {
    private HashMap<String,SmallCategoryPercentDto> small_category;
    private double percent;
    private int total_sales;
    public void updateTotalSales(int sale){
        this.total_sales += sale;
    }
}
