package com.tasteshopping.product.dto;

import lombok.*;

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
    List<ProductOptionListDto> productOptionListDtoList;


}
