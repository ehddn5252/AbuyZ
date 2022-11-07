package com.tasteshopping.product.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoSearchDto {

    private String name;
    private String brandName;
    private String keyword;
    private ProductStatus productStatus;
    private Integer bigCategoriesUid;
    private Integer smallCategoriesUid;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
