package com.tasteshopping.product.service;


import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.ProductPictures;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;


    @Override
    public void createProductOption(int productsUid, Boolean isDefaultOption) {
        ProductOptions productOptions = new ProductOptions();
        Optional<Products> productsOptional = productRepository.findById(productsUid);
        if (productsOptional.isPresent()){
            productOptions.setProduct(productsOptional.get());
        }
        else{
            productOptions.setProduct(null);
        }
        if (!isDefaultOption){
            productOptions.setIsDefaultOption(false);
        }
        productOptionRepository.save(productOptions);
    }

    @Override
    public Optional<Integer> getMaxUid() {
        return productOptionRepository.getMaxUid();
    }
}
