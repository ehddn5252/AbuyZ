package com.tasteshopping.product.service;


import com.tasteshopping.product.dto.ProductOptionListDto;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;

import java.util.List;

public interface ProductOptionService {
    public ProductOptions createProductOptionList(Products p, String name, String value);

//    List<ProductOptionListDto> getOptionListByUid(int productsUid);
}
