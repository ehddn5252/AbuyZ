package com.tasteshopping.inventory.repository;

import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository  extends JpaRepository<Inventories,Integer> {


    @Query(value="select i from Inventories i where i.productOptionList=:optionListString")
    Optional<Inventories> findByOptionListString(String optionListString);

    List<Inventories> findByProduct(Products product);
}
