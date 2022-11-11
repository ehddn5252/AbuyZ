package com.tasteshopping.product.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.*;
import com.tasteshopping.product.entity.Products;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

public interface ProductService {

    Products registerProduct(ProductCreateDto productCreateDto);

    List<ProductDto> getAllProduct();

    BaseRes createProductRelated(ProductCreateDto productCreateDto,
                                 MultipartFile[] multipartFiles,
                                 MultipartFile descriptionImg);

    BaseRes deleteProduct(Integer uid);

    void modifyProductRelated(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles);
    void modifyProduct(ProductCreateDto productCreateDto);

    List<ProductDto> getRandom();

    @Transactional
    void productStatusSetting();

    // 재고 방식 -> 수정 요함
    void modifyProductOption(ProductCreateDto productCreateDto);

    void modifyProductPicture(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles);

    List<ProductDto> findByKeyword(String keyword);

    List<ProductDto> findByStatus(String status);

    List<ProductDto> getProductBySmallCategory(int smallCategoriesUid);

    List<ProductDto> getProductByBigCategory(Integer bigCategoriesUid);

    List<ProductDto> getProductByDeliveryFee(Integer deliveryFeeUid);

    List<ProductDto> getProductByPrice(Integer priceUid);

    List<ProductDto> getProductBySmallCategoryAndDeliveryFee(Integer smallCategoriesUid, Integer deliveryFeeUid);

    List<ProductDto> getProductBySmallCategoryAndPrice(Integer smallCategoriesUid, Integer priceUid);

    public ProductDto getOneProduct(Integer productsUid);

    ProductDetailDto getDetailProduct(String email, int productsUid);

    List<ProductDto> getProductBySmallCategoryAndPriceBetween(Integer smallCategoriesUid,
                                                              Integer startPrice,
                                                              Integer endPrice);

    List<ProductDto> findByKeywordAndFilter(List<ProductDto> newL, SearchDto searchDto);

    BaseRes boSearch(String email, BoSearchReqDto boSearchReqDto);

    BaseRes modifyStatus(String email, int products_uid, String status);

    void putStatus(int uid,String status );

    void checkStatus(int uid);

    List<ProductBoDto> getBoAllProduct();

    BaseRes getProductCreateInfo(int products_uid);
}
