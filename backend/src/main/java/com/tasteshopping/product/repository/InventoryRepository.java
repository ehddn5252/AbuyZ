package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.Inventories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface InventoryRepository  extends JpaRepository<Inventories,Integer> {


    @Query(value="select i from Inventories i where i.productOptionList=:optionListString")
    Optional<Inventories> findByOptionList(String optionListString);
}
