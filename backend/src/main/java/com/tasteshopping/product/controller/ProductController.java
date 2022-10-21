package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductCreateReqDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductUidReqDto;
import com.tasteshopping.product.repository.ProductPictureRepository;
import com.tasteshopping.product.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;

@RestController
@Slf4j
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    ProductService productService;

    // for test
    @Autowired
    ProductPictureRepository productPictureRepository;

    @PostMapping("/test")
    public ResponseEntity<BaseRes> test(@RequestBody ProductCreateReqDto productCreateReqDto) {
        productPictureRepository.deleteByProductsUid(productCreateReqDto.getProducts_uid());
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 test 성공!"));
    }


    @PostMapping("/bo-search")
    public ResponseEntity<BaseRes> boSearch() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "bo-search 성공!", productService.getMaxUid()));
    }

    @GetMapping()
    public ResponseEntity<BaseRes> getAllProduct() {
        System.out.println("in getAllProduct");
        List<ProductDto> productDtoList =productService.getAllProduct();

        System.out.println("===================================");
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 Products 가져오기 성공.", productDtoList));
    }

    @PostMapping("/register")
    public ResponseEntity<BaseRes> register(@RequestBody ProductCreateReqDto productCreateReqDto) {
        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
        // 상품 관련된 모든 것 생성
        productService.createProductRelated(productCreateDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 생성 성공!"));
    }

    @DeleteMapping()
    public ResponseEntity<BaseRes> delete(@RequestBody ProductUidReqDto productUidReqDto) {
        Integer uid = productUidReqDto.getUid();
        productService.deleteProduct(uid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 삭제 성공!"));
    }

    @PutMapping("/modify")
    public ResponseEntity<BaseRes> modify(@RequestBody ProductCreateReqDto productCreateReqDto) {
        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
        productService.modifyProductRelated(productCreateDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 성공!"));

    }


//    @GetMapping("/big-category-list")
//    public ResponseEntity<BaseRes> getBigCategoryList() {
//        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product 등록 성공."));
//    }
}
