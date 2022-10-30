package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Inventories;

import java.util.List;

public interface InventoryService {

    void setPriceAndCount(int price,int count);

    List<Inventories> getInventoryList(int productsUid);

    void putInventoryList(int productsUid);
}
