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

    Integer bigCategoriesUid;
    Integer smallCategoriesUid;
    Integer deliveryFeeUid;
    Integer priceUid;
}
