package com.tasteshopping.product.service;


import com.tasteshopping.product.dto.ProductOptionListDto;

import java.util.List;

public interface ProductOptionListService {
    public void createProductOptionList(String name, String value, Integer options_uid);

    List<ProductOptionListDto> getOptionListByUid(int productsUid);
}
