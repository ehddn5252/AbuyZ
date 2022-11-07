package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.Brands;

import java.util.List;
import java.util.Optional;

public interface ProductKeywordService {
    public void createProductKeyword(String name, Integer products_uid);

    List<ProductDto> findByParamInKeyword(String keyword);
}
