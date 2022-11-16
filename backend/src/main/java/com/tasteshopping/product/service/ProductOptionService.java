package com.tasteshopping.product.service;


import com.tasteshopping.product.dto.ProductOptionListDto;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.Lock;

import javax.persistence.LockModeType;
import java.util.List;

public interface ProductOptionService {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    ProductOptions createProductOptionList(Products p, String name, String value);
}
