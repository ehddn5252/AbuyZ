package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SearchReqDto {

    Integer big_categories_uid;
    Integer small_categories_uid;
    Integer delivery_fee_uid;
    Integer price_uid;

    public SearchDto toDto(){
        SearchDto searchDto = new SearchDto();
        searchDto.setBigCategoriesUid(big_categories_uid);
        searchDto.setSmallCategoriesUid(small_categories_uid);
        searchDto.setDeliveryFeeUid(delivery_fee_uid);
        searchDto.setPriceUid(price_uid);
        return  searchDto;
    }
}
