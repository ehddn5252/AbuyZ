package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.SmallCategories;
import com.tasteshopping.product.repository.SmallCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class SmallCategoryServiceImpl implements SmallCategoryService {

    @Autowired
    SmallCategoryRepository smallCategoryRepository;

    @Override
    public Optional<SmallCategories> findByName(int uid) {
        return smallCategoryRepository.findById(uid);
    }
}
