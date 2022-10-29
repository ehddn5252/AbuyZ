package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.Inventories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository  extends JpaRepository<Inventories,Integer> {




}
