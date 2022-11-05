package com.tasteshopping.inventory.repository;

import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository  extends JpaRepository<Inventories,Integer> {


    @Query(value="select i from Inventories i where i.productOptionList=:optionListString")
    Optional<Inventories> findByOptionListString(String optionListString);

    @Query("select SUM(i.count) from Inventories i where i.product=:product")
    Integer getInventoriesSum(Products product);

    List<Inventories> findByProduct(Products product);
}
