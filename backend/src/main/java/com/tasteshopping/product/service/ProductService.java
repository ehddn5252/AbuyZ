package com.tasteshopping.product.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    void registerProduct(ProductCreateDto productCreateDto);

    List<ProductDto> getAllProduct();

    Optional<Integer> getMaxUid();

    BaseRes createProductRelated(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles);

    void deleteProduct(Integer uid);

    void modifyProductRelated(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles);
    void modifyProduct(ProductCreateDto productCreateDto);

    void modifyProductOption(ProductCreateDto productCreateDto);

    void modifyProductPicture(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles);


    List<ProductDto> findByKeyword(String keyword);

    List<ProductDto> getProductBySmallCategory(int smallCategoriesUid);

    List<ProductDto> getProductByBigCategory(Integer bigCategoriesUid);

    List<ProductDto> getProductByDeliveryFee(Integer deliveryFeeUid);

    List<ProductDto> getProductByPrice(Integer priceUid);

    List<ProductDto> getProductBySmallCategoryAndDeliveryFee(Integer smallCategoriesUid, Integer deliveryFeeUid);

    List<ProductDto> getProductBySmallCategoryAndPrice(Integer smallCategoriesUid, Integer priceUid);

    public ProductDto getOneProduct(Integer productsUid);

    ProductDetailDto getDetailProduct(int productsUid);

    List<ProductDto> getProductBySmallCategoryAndPriceBetween(Integer smallCategoriesUid, Integer startPrice, Integer endPrice);

    List<ProductDto> findByKeywordAndFilter(List<ProductDto> newL, SearchDto searchDto);
}
