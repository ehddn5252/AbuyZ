package com.tasteshopping.product.service;


import java.util.Optional;

public interface ProductOptionService {
    public void createProductOption(int productsUid, Boolean isDefaultOption);

    public Optional<Integer> getMaxUid();
}
