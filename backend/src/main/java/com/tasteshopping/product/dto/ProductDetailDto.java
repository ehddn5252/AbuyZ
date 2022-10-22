package com.tasteshopping.product.dto;

import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.entity.ProductPictures;
import com.tasteshopping.product.entity.Products;
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
