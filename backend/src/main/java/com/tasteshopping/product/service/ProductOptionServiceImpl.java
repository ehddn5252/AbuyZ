package com.tasteshopping.product.service;


import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {
    @Autowired
    ProductOptionRepository productOptionRepository;

    @Override
    public void createProductOptionList(Products p,
                                        String name,
                                        String value) {
        ProductOptions productOptionList = new ProductOptions();
        productOptionList.setName(name);
        productOptionList.setValue(value);
        productOptionList.setProduct(p);
        productOptionRepository.save(productOptionList);
    }
}
