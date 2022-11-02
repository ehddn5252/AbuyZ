package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.ProductKeywords;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductKeywordRepository;
import com.tasteshopping.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


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

    @Override
    public List<ProductDto> findByParamInKeyword(String keyword) {
        List<Optional<Products>> l = productKeywordRepository.findByParamInKeyword(keyword);
        List<ProductDto> newL = new ArrayList<>();
        // 여기에 옵션 리스트, 사진, 키워드,
        for(int i=0;i<l.size();++i){
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }
}
