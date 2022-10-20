package com.tasteshopping.categories.service;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import com.tasteshopping.categories.entity.SmallCategories;

import java.util.List;
import java.util.Optional;

public interface SmallCategoryService {
    public Optional<SmallCategories> findByName(int uid);

    public List<SmallCategoryDto> getAllSmallCategories();
    public SmallCategoryDto getOneSmallCategories(Integer categoryUid);

    public List<SmallCategoryDto> getSmallCategoryList(Integer categoryUid);
}
