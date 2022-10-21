package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductUidReqDto;
import com.tasteshopping.product.entity.Products;

import java.util.HashMap;
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
}
