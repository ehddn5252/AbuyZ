package com.tasteshopping.product.service;


import java.util.Optional;

public interface ProductOptionService {
    public void createProductOption(int productsUid);

    public Optional<Integer> getMaxUid();
}
