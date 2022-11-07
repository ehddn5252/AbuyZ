package com.tasteshopping.wish.repository;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.wish.entity.WishLists;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<WishLists,Integer> {
    @EntityGraph(attributePaths ={"user","products"})
    Page<WishLists> findByUserEmail(@Param("email")String email, Pageable pageable);
    Optional<WishLists> findByUserAndProducts(Users users, Products products);
    Optional<WishLists> findByUserAndUid(Users users, Integer uid);
}
