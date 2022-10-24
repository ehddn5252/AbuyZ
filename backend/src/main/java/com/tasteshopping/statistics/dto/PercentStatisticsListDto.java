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
public class PercentStatisticsListDto {
    private HashMap<String,BigCategoryPercentDto>big_category;
    private int total_sales;
    public void updateTotalSales(int sale){
        this.total_sales += sale;
    }
}
