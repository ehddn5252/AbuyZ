package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductDto;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    void modifyProductOption(ProductCreateDto productCreateDto);

    void modifyProductPicture(ProductCreateDto productCreateDto);

    public void registerProduct(ProductCreateDto productCreateDto);

    public List<ProductDto> getAllProduct();

    public Optional<Integer> getMaxUid();

    public void createProductRelated(ProductCreateDto productCreateDto);

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
}
