package com.tasteshopping.product.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    void modifyProductOption(ProductCreateDto productCreateDto);

    void modifyProductPicture(ProductCreateDto productCreateDto);

    public void registerProduct(ProductCreateDto productCreateDto);

    public List<ProductDto> getAllProduct();

    public Optional<Integer> getMaxUid();

    public BaseRes createProductRelated(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles);

    public void deleteProduct(Integer uid);

    public void modifyProduct(ProductCreateDto productCreateDto);
    public void modifyProductRelated(ProductCreateDto productCreateDto);

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
