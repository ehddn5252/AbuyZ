package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.*;
import com.tasteshopping.product.exception.InputIsNotCorrectException;
import com.tasteshopping.product.exception.NoAuthorizationException;
import com.tasteshopping.product.exception.OptionNotFoundException;
import com.tasteshopping.product.exception.ProductNotFoundException;
import com.tasteshopping.product.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.util.annotation.Nullable;

import java.util.*;

@RestController
@Slf4j
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    private final ProductKeywordService productKeywordService;

    @GetMapping("/random")
    public ResponseEntity<BaseRes> getRandom() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "random Str 성공!", productService.getRandom()));
    }

    @PutMapping("/status/setting/{uid}")
    public ResponseEntity<BaseRes> checkByStatus(@AuthenticationPrincipal String email, @PathVariable int uid) {
        productService.checkStatus(uid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "특정 uid 상품 상태 세팅 성공!", null));
    }

    @PutMapping("/status/setting")
    public ResponseEntity<BaseRes> settingStatus(@AuthenticationPrincipal String email) {
        productService.productStatusSetting();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "모든 상품 상태 세팅 성공!", null));
    }


    @GetMapping("/status/{status}")
    public ResponseEntity<BaseRes> getByStatus(@AuthenticationPrincipal String email, @PathVariable String status) {
        // 상품 상태로로 검색한 기록
        List<ProductDto> newL = productService.findByStatus(status);

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 상태로 검색 성공!", newL));
    }

    @GetMapping("/status/num/{status}")
    public ResponseEntity<BaseRes> getNumByStatus(@AuthenticationPrincipal String email, @PathVariable String status) {
        // 상품 상태로로 검색한 기록
        List<ProductDto> newL = productService.findByStatus(status);

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 상태로 수 가져오기 성공!", newL.size()));
    }

    @PutMapping("/status/{uid}/{status}")
    public ResponseEntity<BaseRes> getNumByStatus(@AuthenticationPrincipal String email, @PathVariable int uid, @PathVariable String status) {
        // 상품 상태로로 검색한 기록
        productService.putStatus(uid, status);

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 상태 변경 성공!", null));
    }

    @PostMapping("/bo-search")
    public ResponseEntity<BaseRes> boSearch(@AuthenticationPrincipal String email,
                                            @RequestBody BoSearchReqDto boSearchReqDto) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.boSearch(email, boSearchReqDto));
    }

    @PostMapping("/fo-search/detail")
    public ResponseEntity<BaseRes> foSearch(@RequestBody SearchReqDto searchReqDto) {
        SearchDto searchDto = searchReqDto.toDto();
        // 4개의 분기로 쪼개서 검색합니다. big category, small category, price, deliveryFee
        List<ProductDto> l = new ArrayList<>();

        // price 로 찾기
        if (searchDto.getStartPrice() != null && searchDto.getEndPrice() != null) {
            l = productService.getProductBySmallCategoryAndPriceBetween(searchDto.getSmallCategoriesUid(), searchDto.getStartPrice(), searchDto.getEndPrice());
        } else if (searchDto.getPriceUid() != null) {
            l = productService.getProductBySmallCategoryAndPrice(searchDto.getSmallCategoriesUid(), searchDto.getPriceUid());
        }

        // deliveryFee 로 찾기
        else if (searchDto.getDeliveryFeeUid() != null) {
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


    @PutMapping("/status")
    public ResponseEntity<BaseRes> changeStatus(@AuthenticationPrincipal String email,
                                                @RequestBody ProductUidReqDto productUidReqDto) {

        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.modifyStatus(email, productUidReqDto.getProducts_uid(), productUidReqDto.getStatus()));
        } catch (NoAuthorizationException e) {
            e.printStackTrace();
            return ResponseEntity.status(403).body(new BaseRes(403, "권한이 없습니다.", null));
        }
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
        newL = productService.findByKeywordAndFilter(newL, searchDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "fo 기본 검색 성공!", newL));
    }


    @PostMapping("/detail")
    public ResponseEntity<BaseRes> getProductDetailPage(@Nullable @AuthenticationPrincipal String email, @RequestBody ProductUidReqDto productUidReqDto) {
        try {
            ProductDetailDto l = productService.getDetailProduct(email, productUidReqDto.getProducts_uid());
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "product dto 상세 검색 성공!", l));
        } catch (ProductNotFoundException e) {
            return e.baseResResponseEntity;
        } catch (OptionNotFoundException e){
            return e.baseResResponseEntity;
        }
    }

    @GetMapping()
    public ResponseEntity<BaseRes> getAllProduct() {
        List<ProductDto> productDtoList = productService.getAllProduct();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 Products 가져오기 성공.", productDtoList));
    }

    @GetMapping("/bo")
    public ResponseEntity<BaseRes> getBoAllProduct() {
        List<ProductBoDto> productDtoList = productService.getBoAllProduct();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 Products 가져오기 성공.", productDtoList));
    }

    @PostMapping("/register")
    public ResponseEntity<BaseRes> register(@AuthenticationPrincipal String email,
                                            @RequestPart ProductCreateDto productCreateDto,
                                            @RequestPart(name = "file", required = false) MultipartFile[] multipartFiles,
                                            @RequestPart(name = "descFile", required = false) MultipartFile descriptionImg
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.createProductRelated(productCreateDto, multipartFiles, descriptionImg));
        }
        catch (InputIsNotCorrectException e){
            return e.baseResResponseEntity;
        }
    }


    @DeleteMapping("/{productsUid}")
    public ResponseEntity<BaseRes> delete(@AuthenticationPrincipal String email,
                                          @PathVariable int productsUid) {
//        Integer uid = productUidReqDto.getProducts_uid();
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.deleteProduct(productsUid));
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
            return e.baseResResponseEntity;
        }
    }

    @PutMapping("/modify")
    public ResponseEntity<BaseRes> modify(@AuthenticationPrincipal String email,
                                          @RequestPart ProductCreateDto productCreateDto,
                                          @RequestPart(name = "file", required = false) MultipartFile[] multipartFiles,
                                          @RequestPart(name ="descFile",required=false) MultipartFile descFile){
        productService.modifyProductRelated(productCreateDto, multipartFiles);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "상품 변경 성공!"));
    }

    @PostMapping("/input-product")
    public ResponseEntity<BaseRes> getProductDetail(@RequestBody ProductUidReqDto productUidReqDto){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.getProductCreateInfo(productUidReqDto.getProducts_uid()));
        }
        catch (ProductNotFoundException p){
            return p.baseResResponseEntity;
        }
    }
}
