package com.tasteshopping.categories.service;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.categories.repository.BigCategoryRepository;
import com.tasteshopping.categories.repository.SmallCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BigCategoryServiceImpl implements BigCategoryService {

    @Autowired
    BigCategoryRepository bigCategoryRepository;

    @Override
    public List<BigCategoryDto> getAllBigCategories() {
        List<BigCategories> l = bigCategoryRepository.findAll();
        List<BigCategoryDto> dto_l = new ArrayList<>();
        for(int i=0;i<l.size();++i)
            dto_l.add(BigCategories.toDto(l.get(i)));
        return dto_l;
    }

    @Override
    public BigCategoryDto getOneBigCategories(Integer categoryUid) {

        Optional<BigCategories> b = bigCategoryRepository.findByUid(categoryUid);
        if (b.isPresent()){
            return BigCategories.toDto(b.get());
        }
        else{
            //not found exception 처리
        }
        return null;
    }
}
