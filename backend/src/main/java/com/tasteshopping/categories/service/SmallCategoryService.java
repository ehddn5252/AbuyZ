package com.tasteshopping.categories.service;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import com.tasteshopping.categories.entity.SmallCategories;

import java.util.Optional;

public interface SmallCategoryService {
    public Optional<SmallCategories> findByName(int uid);
    public SmallCategoryDto getOneSmallCategories(Integer categoryUid);
}
