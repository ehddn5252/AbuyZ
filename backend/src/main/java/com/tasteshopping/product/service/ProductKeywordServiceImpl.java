package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.ProductKeywords;
import com.tasteshopping.product.repository.ProductKeywordRepository;
import com.tasteshopping.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProductKeywordServiceImpl implements ProductKeywordService{

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductKeywordRepository productKeywordRepository;

    @Override
    public void createProductKeyword(String name, Integer products_uid) {
        ProductKeywords productKeywords = new ProductKeywords();
        productKeywords.setProduct(productRepository.findById(products_uid).get());
        productKeywords.setName(name);
        productKeywordRepository.save(productKeywords);
    }
}
