package com.tasteshopping.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SmallCategoryPercentDto {
    private double percent;
    private int total_sales;
    public void updateTotalSales(int sale){
        this.total_sales += sale;
    }
}
