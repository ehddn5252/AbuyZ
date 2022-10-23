package com.tasteshopping.cart.dto;

import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductOptionListDto;
import com.tasteshopping.product.entity.ProductOptionLists;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartResDto {

    private Integer uid;
    private ProductDto productDto;
    private Integer productCount;
    private List<ProductOptionListDto> productOptionListDto;
}
