package com.tasteshopping.inventory.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.dto.InventoryReqDto2;

public interface InventoryService {

    BaseRes getInventoryList(int productsUid);

    BaseRes putInventoryList(InventoryReqDto2 inventoryReqDto);
}
