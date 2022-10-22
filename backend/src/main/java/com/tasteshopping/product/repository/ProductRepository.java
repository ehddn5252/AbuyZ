package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Products,Integer> {
    @Query(value="select max(uid) from Products")
    public Optional<Integer> getMaxUid();

    public List<Optional<Products>> findByNameContains(String keyword);
}
