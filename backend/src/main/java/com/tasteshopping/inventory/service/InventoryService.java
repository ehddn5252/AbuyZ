package com.tasteshopping.inventory.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.dto.InventoryReqDto;

public interface InventoryService {

    BaseRes getInventoryList(int productsUid);

    BaseRes putInventoryList(InventoryReqDto inventoryReqDto);

    BaseRes checkCartByInventory(String email);

    BaseRes checkBasicByInventory(String email, CartDto cartDto);

    Integer getEmptyNum();
}
