package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Products;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    public void registerProduct(HashMap<String, Object> param);

    public List<Products> getAllProduct();

    public Optional<Integer> getMaxUid();
}
