package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Brands;

import java.util.Optional;

public interface BrandService {
    public Optional<Brands> findByName(String name);
}
