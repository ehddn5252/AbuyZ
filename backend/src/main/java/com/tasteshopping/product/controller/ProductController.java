package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.*;
import com.tasteshopping.product.repository.ProductPictureRepository;
import com.tasteshopping.product.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    ProductKeywordService productKeywordService;
    // for test


    @Autowired
    ProductOptionListService productOptionListService;

    @PostMapping("/test")
    public ResponseEntity<BaseRes> test(@RequestBody ProductCreateReqDto productCreateReqDto) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 test 성공!"));
    }

    @PostMapping("/bo-search")
    public ResponseEntity<BaseRes> boSearch(@RequestBody BoSearchReqDto boSearchReqDto) {

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "bo-search 성공!", productService.getMaxUid()));
    }

    @PostMapping("/fo-search/detail")
    public ResponseEntity<BaseRes> foSearch(@RequestBody SearchReqDto searchReqDto) {
        SearchDto searchDto = searchReqDto.toDto();
        // 4개의 분기로 쪼개기 big category, small category, price, deliveryFee
        List<ProductDto> l = new ArrayList<>();

        // price 로 찾기
        if(searchDto.getStartPrice() !=null && searchDto.getEndPrice() !=null){
            l = productService.getProductBySmallCategoryAndPriceBetween(searchDto.getSmallCategoriesUid(),searchDto.getStartPrice(),searchDto.getEndPrice());
        }

        else if (searchDto.getPriceUid() != null) {
//            l = productService.getProductByPrice(searchDto.getPriceUid());
            l = productService.getProductBySmallCategoryAndPrice(searchDto.getSmallCategoriesUid(),searchDto.getPriceUid());
        }

        // deliveryFee 로 찾기
        else if (searchDto.getDeliveryFeeUid() != null) {
            // l = productService.getProductByDeliveryFee(searchDto.getDeliveryFeeUid());
            l = productService.getProductBySmallCategoryAndDeliveryFee(searchDto.getSmallCategoriesUid(), searchDto.getDeliveryFeeUid());
        }

        // small category 로 찾기
        else if (searchDto.getSmallCategoriesUid() != null) {
            l = productService.getProductBySmallCategory(searchDto.getSmallCategoriesUid());
        }
        // big category 로 찾기
        else if (searchDto.getBigCategoriesUid() != null) {
            l = productService.getProductByBigCategory(searchDto.getBigCategoriesUid());
        }

        if (l.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "해당 조건을 만족하는 상품이 없습니다!"));
        }

        System.out.println(l.toString());
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "fo 상세 검색 성공!", l));
    }

    @GetMapping("/fo-search/basic/{keyword}")
    public ResponseEntity<BaseRes> foSearchKeyword(@PathVariable String keyword) {
        // 제목으로 검색한 기록
        List<ProductDto> newL = productService.findByKeyword(keyword);
        // 키워드로 검색한 기록
        if (newL.size() == 0) {
            newL = productKeywordService.findByParamInKeyword(keyword);
        }
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "fo 기본 검색 성공!", newL));
    }

    @PostMapping("/fo-search/keyword/detail")
    public ResponseEntity<BaseRes> foSearchKeywordAndFilter(@RequestBody SearchReqDto searchReqDto) {
        SearchDto searchDto = searchReqDto.toDto();
        // 제목으로 검색한 기록
        List<ProductDto> newL = productService.findByKeyword(searchDto.getKeyword());
        // 키워드로 검색한 기록
        if (newL.size() == 0) {
            newL = productKeywordService.findByParamInKeyword(searchDto.getKeyword());
        }
        for(int i=0;i<newL.size();++i){
            System.out.println(newL.get(i).getBigCategoryUid());

        }
        newL =productService.findByKeywordAndFilter(newL,searchDto);

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "fo 기본 검색 성공!", newL));
    }


//    @PostMapping("/detail")
//    public ResponseEntity<BaseRes> getProductDetailPage(@RequestBody ProductUidReqDto productUidReqDto) {
//        /*
//        상품 detail 에서는 상품, 사진, 옵션 dto 를 가져와야함 SQL에서 처리 안하는 따로버전
//         */
//        ProductUidDto productUidDto = productUidReqDto.toDto();
//        // 상품 가져옴
//        ProductDto p = productService.getOneProduct(productUidDto.getProductsUid());
//
//        // 상품 사진 가져옴
//        List<ProductPictureDto> productPictureDto = productPictureService.getProductPictureByPicturesUid(productUidDto.getProductsUid());
//        // 상품 옵션 가져옴
////        List<ProductOptionListDto> productOptionListDtos = productOptionListService.getOptionListByUid(productUidDto.getProductsUid());
//
//        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product dto 상세 검색 성공!"));
//    }

    @PostMapping("/detail")
    public ResponseEntity<BaseRes> getProductDetailPage(@RequestBody ProductUidReqDto productUidReqDto) {
        ProductUidDto productUidDto = productUidReqDto.toDto();
        ProductDetailDto l = productService.getDetailProduct(productUidDto.getProductsUid());
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product dto 상세 검색 성공!",l));
    }


    @GetMapping()
    public ResponseEntity<BaseRes> getAllProduct() {
        System.out.println("in getAllProduct");
        List<ProductDto> productDtoList = productService.getAllProduct();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 Products 가져오기 성공.", productDtoList));
    }

//    @PostMapping("/register")
//    public ResponseEntity<BaseRes> register(@RequestBody ProductCreateReqDto productCreateReqDto) {
//        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
//        // 상품 관련된 모든 것 생성
//        productService.createProductRelated(productCreateDto);
//        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 생성 성공!"));
//    }

    @PostMapping("/register")
    public ResponseEntity<BaseRes> registerImgTest(@RequestPart ProductCreateReqDto productCreateReqDto,
                                                   @RequestPart(name = "file",required = false) MultipartFile[] multipartFiles) {
        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
        // 상품 관련된 모든 것 생성

        return ResponseEntity.status(HttpStatus.OK).body(productService.createProductRelated(productCreateDto,multipartFiles));
    }


    @DeleteMapping()
    public ResponseEntity<BaseRes> delete(@RequestBody ProductUidReqDto productUidReqDto) {
        Integer uid = productUidReqDto.getProducts_uid();
        productService.deleteProduct(uid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 삭제 성공!"));
    }

    @PutMapping("/modify")
    public ResponseEntity<BaseRes> modify(@RequestPart ProductCreateReqDto productCreateReqDto,
                                          @RequestPart(name = "file",required = false) MultipartFile[] multipartFiles) {
        ProductCreateDto productCreateDto = ProductCreateDto.reqToDto(productCreateReqDto);
        productService.modifyProductRelated(productCreateDto,multipartFiles);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 성공!"));
    }
}