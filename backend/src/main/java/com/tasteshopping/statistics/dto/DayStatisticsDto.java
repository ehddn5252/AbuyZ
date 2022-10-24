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
public class DayStatisticsDto {
    private String day;
    private int sales_amount;
    public void updateSalesAmount(int sale){
        this.sales_amount+=sale;
    }
}
