package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.entity.ProductOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductOptionListRepository extends JpaRepository<ProductOptionLists,Integer> {

}
