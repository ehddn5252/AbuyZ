package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brands,Integer> {
    public Optional<Brands> findByName(String name);
}
