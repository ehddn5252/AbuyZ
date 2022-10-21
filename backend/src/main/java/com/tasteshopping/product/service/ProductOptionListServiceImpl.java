package com.tasteshopping.product.service;


import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.repository.ProductOptionListRepository;
import com.tasteshopping.product.repository.ProductOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOptionListServiceImpl implements ProductOptionListService {
    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    ProductOptionListRepository productOptionListRepository;

    @Override
    public void createProductOptionList(String name, String value, Integer options_uid) {
        ProductOptionLists productOptionList = new ProductOptionLists();
        productOptionList.setProductOptions(productOptionRepository.findById(options_uid).get());
        productOptionList.setName(name);
        productOptionList.setValue(value);
        productOptionList.setOptionPrice(0);
        productOptionListRepository.save(productOptionList);
    }
}
