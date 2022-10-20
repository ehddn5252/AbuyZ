package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductCreateReqDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Slf4j
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping()
    public ResponseEntity<BaseRes> test() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!", productService.getMaxUid()));
    }

    @PostMapping("/register-test")
    public ResponseEntity<BaseRes> registerTest(@RequestBody ProductCreateReqDto productCreateReqDto) {
        System.out.println(productCreateReqDto.toString());
        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
        productService.createProductRelated(productCreateDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, " 성공!"));
    }

    @GetMapping()
    public ResponseEntity<BaseRes> getAllProduct() {
        List<Products> l = productService.getAllProduct();
        System.out.println("in getAllProduct");
        List<ProductDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            new_l.add(l.get(i).toDto());
        }
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 Products 가져오기 성공.", new_l));
    }

    @PostMapping("/register")
    public ResponseEntity<BaseRes> register(@RequestBody ProductCreateReqDto productCreateReqDto) {
        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
        // 상품 관련된 모든 것 생성
        productService.createProductRelated(productCreateDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 생성 성공!"));
    }

    @GetMapping("/big-category-list")
    public ResponseEntity<BaseRes> getBigCategoryList() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product 등록 성공."));
    }
}
