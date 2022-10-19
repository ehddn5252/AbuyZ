package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductKeywordRepository;
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

    @Autowired
    ProductPictureService productPictureService;

    @Autowired
    ProductOptionService productOptionService;

    @Autowired
    ProductOptionListService productOptionListService;

    @Autowired
    ProductKeywordService productKeywordService;


    @PostMapping()
    public ResponseEntity<BaseRes> test() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!", productService.getMaxUid()));
    }

    @PostMapping("/register-test")
    public ResponseEntity<BaseRes> registerTest(@RequestBody HashMap<String, Object> param) {
        ((LinkedHashMap<String, String>) param.get("imgs")).forEach((k, v) -> System.out.println(k + " " + v));

        LinkedHashMap<String, String> imgs = (LinkedHashMap<String, String>) param.get("imgs");
        for (String key : imgs.keySet()) {
            productPictureService.createProductPicture(3, imgs.get(key));
        }

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!", param.get("imgs")));
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
    @Transactional
    public ResponseEntity<BaseRes> register(@RequestBody HashMap<String, Object> param) {
        /*
            param 이 넘겨오면 해야할 것
            1. Products product 를 생성한다. ok
            2. product_uid 에 맞는 product_pictures 를 생성한다. ok
            3. product_uid 에 맞는 product_options 를 생성한다.
            4. product_options에 맞는 product_option_lists를 생성한다.
            5. product_uid 에 맞는 product_keywords 를 생성한다.
         */
        //save product
        productService.registerProduct(param);
        int products_uid = 1;
        Optional<Integer> maxUidOptional = productService.getMaxUid();
        if (maxUidOptional.isPresent()) {
            products_uid = maxUidOptional.get();
        }

        // save imgs
        LinkedHashMap<String, String> imgs = (LinkedHashMap<String, String>) param.get("imgs");
        for (String key : imgs.keySet()) {
            productPictureService.createProductPicture(products_uid, imgs.get(key));
        }

        //save product_options
        LinkedHashMap<String, String> options = (LinkedHashMap<String, String>) param.get("options");
        productOptionService.createProductOption(products_uid);

        int options_uid = 1;
        Optional<Integer> maxOptionUidOptional = productOptionService.getMaxUid();
        if (maxOptionUidOptional.isPresent()) {
            options_uid = maxOptionUidOptional.get();
        }
        // save product_option_lists
        for (String key : options.keySet()) {
            String[] sList = options.get(key).split(",");
            for (int i = 0; i < sList.length; ++i) {
                productOptionListService.createProductOptionList(key, sList[i].trim(), options_uid);
            }
        }
        // save keyword lists
        String[] keywordList = ((String) param.get("keywords")).split(",");
        for (int i = 0; i < keywordList.length; ++i) {
            productKeywordService.createProductKeyword(keywordList[i].trim(), products_uid);
        }

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product 등록 성공."));
    }

    @GetMapping("/big-category-list")
    public ResponseEntity<BaseRes> getBigCategoryList() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product 등록 성공."));
    }
}
