package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.SmallCategories;

import java.util.Optional;

public interface SmallCategoryService {
    public Optional<SmallCategories> findByName(int uid);
}
