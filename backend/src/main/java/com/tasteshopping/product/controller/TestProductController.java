package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductCreateReqDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductUidReqDto;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductPictureRepository;
import com.tasteshopping.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("test/product")
@RequiredArgsConstructor
public class TestProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductOptionRepository productOptionRepository;
    // for test
    @Autowired
    ProductPictureRepository productPictureRepository;

    @PostMapping("/test")
    public ResponseEntity<BaseRes> test(@RequestBody ProductCreateReqDto productCreateReqDto) {
        productPictureRepository.deleteByProductsUid(productCreateReqDto.getProducts_uid());
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 test 성공!"));
    }

    @PostMapping("/option")
    public ResponseEntity<BaseRes> optionTest(@RequestBody ProductCreateReqDto productCreateReqDto) {
        Optional<ProductOptions> l = productOptionRepository.findByProductsUid(productCreateReqDto.getProducts_uid());
        List<ProductOptions> s = new ArrayList<>();
            System.out.println(l.get().getUid());
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 test 성공!"));
    }
}
