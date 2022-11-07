package com.tasteshopping.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductStatisticsDto implements Comparable<ProductStatisticsDto>{
    private String big_category_name;
    private String small_category_name;
    private int count;
    private int sales_amount;

    public ProductStatisticsDto(String big_category_name,String small_category_name){
        this.big_category_name = big_category_name;
        this.small_category_name = small_category_name;
    }
    public void updateCount(int count){
        this.count+=count;
    }
    public void updateSalesAmount(int sales_amount){
        this.sales_amount+=sales_amount;
    }
    @Override
    public int compareTo(ProductStatisticsDto productStatisticsDto) {
        return productStatisticsDto.getSales_amount()-this.sales_amount;
    }
}
