package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Brands;

import java.util.Optional;

public interface ProductKeywordService {
    public void createProductKeyword(String name, Integer products_uid);
}
