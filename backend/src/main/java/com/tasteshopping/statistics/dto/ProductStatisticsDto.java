package com.tasteshopping.statistics.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductStatisticsDto implements Comparable<ProductStatisticsDto>{
    private String product_name;
    private String big_category_name;
    private String small_category_name;
    private int count;
    private int sales_amount;

    public ProductStatisticsDto(String product_name, String big_category_name,String small_category_name){
        this.product_name = product_name;
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
