package com.tasteshopping.product.dto;

import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.entity.SmallCategories;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SearchDto {

    String keyword;
    Integer bigCategoriesUid;
    Integer smallCategoriesUid;
    Integer deliveryFeeUid;
    Integer priceUid;
    Integer startPrice;
    Integer endPrice;
}
