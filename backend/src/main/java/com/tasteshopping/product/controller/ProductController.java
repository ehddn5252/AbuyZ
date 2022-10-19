package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping()
    public ResponseEntity<BaseRes> test() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @PostMapping("/register")
    public ResponseEntity<BaseRes> register(@RequestBody HashMap<String, Object> param) {
        System.out.println(param.toString());
        System.out.println(param.get("options"));
        ProductDto productDto = new ProductDto();
//        productService.registerProduct(productDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "option_test 성공!"));
    }

}
