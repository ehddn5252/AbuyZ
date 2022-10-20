package com.tasteshopping.categories.service;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.categories.repository.SmallCategoryRepository;
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

    @Override
    public SmallCategoryDto getOneSmallCategories(Integer categoryUid) {

        Optional<SmallCategories> b = smallCategoryRepository.findByUid(categoryUid);
        if (b.isPresent()){
            return SmallCategories.toDto(b.get());
        }
        else{
            //not found exception 처리
        }
        return null;
    }
}
