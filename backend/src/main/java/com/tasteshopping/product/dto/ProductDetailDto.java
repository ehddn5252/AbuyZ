package com.tasteshopping.product.dto;

import com.tasteshopping.wish.dto.IsWished;
import lombok.*;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailDto {

    ProductDto products;
    List<ProductPictureDto> productPictureDto;
    HashMap<String,List> productOptionListMap;
//    List<ProductOptionListDto> productOptionListDtoList;
    private IsWished isWished;
}
