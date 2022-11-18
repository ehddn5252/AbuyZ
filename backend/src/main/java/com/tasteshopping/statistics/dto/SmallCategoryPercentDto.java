package com.tasteshopping.statistics.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SmallCategoryPercentDto implements Comparable<SmallCategoryPercentDto>{
    private double percent;
    private int total_sales;
    public void updateTotalSales(int sale){
        this.total_sales += sale;
    }
    @Override
    public int compareTo(SmallCategoryPercentDto smallCategoryPercentDto) {
        return smallCategoryPercentDto.getTotal_sales()-this.total_sales;
    }
}
