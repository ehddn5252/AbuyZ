package com.tasteshopping.product.service;


import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.ProductPictures;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductOptionListRepository;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductOptionListServiceImpl implements ProductOptionListService {
    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    ProductOptionListRepository productOptionListRepository;

    @Override
    public void createProductOptionList(String name, String value, Integer options_uid) {
        ProductOptionLists productPictures = new ProductOptionLists();
        productPictures.setProductOptions(productOptionRepository.findById(options_uid).get());
        productPictures.setName(name);
        productPictures.setValue(value);
        productPictures.setOptionPrice(0);
        productOptionListRepository.save(productPictures);
    }
}
