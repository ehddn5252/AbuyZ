package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Inventories;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {
    UserRepository userRepository;


    @Override
    public void setPriceAndCount(int price, int count) {

    }

    @Override
    public List<Inventories> getInventoryList(int productsUid) {
        return null;
    }

    @Override
    public void putInventoryList(int productsUid) {

    }
}