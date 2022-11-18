package com.tasteshopping.categories.controller;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.service.BigCategoryService;
import com.tasteshopping.categories.service.SmallCategoryService;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    SmallCategoryService smallCategoryService;

    @Autowired
    BigCategoryService bigCategoryService;

    @GetMapping("/big-category")
    public ResponseEntity<BaseRes> getAllBigCategories() {
        List<BigCategoryDto> l= bigCategoryService.getAllBigCategories();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 대분류 가져오기 성공.",l));
    }

    @GetMapping("/small-category")
    public ResponseEntity<BaseRes> getAllSmallCategories() {
        List<SmallCategoryDto> l= smallCategoryService.getAllSmallCategories();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 small category 가져오기 성공.",l));
    }
    @GetMapping("/big-category/{categoryUid}")
    public ResponseEntity<BaseRes> getBigCategories(@PathVariable int categoryUid) {
        BigCategoryDto bigCategoryDto= bigCategoryService.getOneBigCategories(categoryUid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "특정 대분류 가져오기 성공.",bigCategoryDto));
    }

    @GetMapping("/small-category/{categoryUid}")
    public ResponseEntity<BaseRes> getSmallCategories(@PathVariable int categoryUid) {
        SmallCategoryDto smallCategoryDto = smallCategoryService.getOneSmallCategories(categoryUid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "특정 소분류 가져오기 성공.",smallCategoryDto));
    }

    @GetMapping("/big-category/{categoryUid}/small-category")
    public ResponseEntity<BaseRes> getSmallCategoryList(@PathVariable int categoryUid) {
        List<SmallCategoryDto> smallCategoryList = smallCategoryService.getSmallCategoryList(categoryUid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "특정 소분류 가져오기 성공.",smallCategoryList));
    }
}
