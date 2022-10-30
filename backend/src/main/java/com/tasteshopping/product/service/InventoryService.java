package com.tasteshopping.product.service;

import com.tasteshopping.common.dto.BaseRes;

public interface InventoryService {

    void setPriceAndCount(int price,int count);

    BaseRes getInventoryList(int productsUid);

    void putInventoryList(int productsUid);
}
