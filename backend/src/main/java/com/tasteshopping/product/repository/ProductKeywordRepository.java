package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductKeywords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductKeywordRepository extends JpaRepository<ProductKeywords,Integer> {
}
