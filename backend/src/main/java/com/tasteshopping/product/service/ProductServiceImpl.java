package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;
    @Override
    public void registerProduct(Products product) {
        productRepository.save(product);
    }
}
