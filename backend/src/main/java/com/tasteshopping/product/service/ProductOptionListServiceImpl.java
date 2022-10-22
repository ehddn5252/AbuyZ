package com.tasteshopping.product.service;


import com.tasteshopping.product.dto.ProductOptionListDto;
import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.repository.ProductOptionListRepository;
import com.tasteshopping.product.repository.ProductOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public List<ProductOptionListDto> getOptionListByUid(int productsUid) {
        List<ProductOptionListDto> productOptionList = new ArrayList<>();
        List<Optional<ProductOptionLists>> productOptionLists = productOptionListRepository.findByProductOptionsUid(productsUid);

        for(int i=0;i<productOptionLists.size();++i){
            productOptionList.add(productOptionLists.get(i).get().toDto());
        }
        return productOptionList;
    }
}
