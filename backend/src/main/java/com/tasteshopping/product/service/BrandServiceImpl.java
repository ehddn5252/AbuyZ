package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    BrandRepository brandRepository;

    @Override
    public Optional<Brands> findByName(String name) {
        return brandRepository.findByName(name);
    }
}
