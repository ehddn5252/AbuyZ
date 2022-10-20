package com.tasteshopping.categories.service;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.categories.repository.SmallCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
    public List<SmallCategoryDto> getAllSmallCategories() {
        List<SmallCategories> l = smallCategoryRepository.findAll();
        List<SmallCategoryDto> dto_l = new ArrayList<>();
        for(int i=0;i<l.size();++i)
            dto_l.add(SmallCategories.toDto(l.get(i)));
        return dto_l;
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

    @Override
    public List<SmallCategoryDto> getSmallCategoryList(Integer categoryUid) {
        List<Optional<SmallCategories>> l = smallCategoryRepository.findByBigCategoryUid(categoryUid);
        List<SmallCategoryDto> dto_l = new ArrayList<>();
        for(int i=0;i<l.size();++i)
            dto_l.add(SmallCategories.toDto(l.get(i).get()));
        smallCategoryRepository.findByBigCategoryUid(categoryUid);
        return dto_l;
    }
}
