package com.tasteshopping.categories.service;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public interface BigCategoryService {
    public List<BigCategoryDto> getAllBigCategories();
    public BigCategoryDto getOneBigCategories(Integer categoryUid);

}
