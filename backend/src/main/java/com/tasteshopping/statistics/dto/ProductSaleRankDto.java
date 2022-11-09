package com.tasteshopping.statistics.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSaleRankDto {
    private String product_name;
    private int rank;
    private String big_category_name;
    private String small_category_name;
    private int count;
    private int sales_amount;
}
