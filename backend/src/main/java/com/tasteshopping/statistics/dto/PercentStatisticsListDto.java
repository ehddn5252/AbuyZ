package com.tasteshopping.statistics.dto;

import lombok.*;

import java.util.TreeMap;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PercentStatisticsListDto {
    private TreeMap<String,BigCategoryPercentDto> big_category;
    private int total_sales;
    public void updateTotalSales(int sale){
        this.total_sales += sale;
    }
}
