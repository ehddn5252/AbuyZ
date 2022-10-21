package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.BigCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BigCategoryRepository extends JpaRepository<BigCategories,Integer> {
}
