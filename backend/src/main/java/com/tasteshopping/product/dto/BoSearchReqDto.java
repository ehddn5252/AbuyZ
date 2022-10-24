package com.tasteshopping.product.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoSearchReqDto {

    private String name;
    private String brand_name;
    private String keyword;
    private ProductStatus product_status;
    private Integer big_categories_uid;
    private Integer small_categories_uid;
    private LocalDateTime start_date;
    private LocalDateTime end_date;
}
