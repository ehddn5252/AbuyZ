package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOptions,Integer> {
    @Query(value="select max(uid) from ProductOptions")
    public Optional<Integer> getMaxUid();
}
