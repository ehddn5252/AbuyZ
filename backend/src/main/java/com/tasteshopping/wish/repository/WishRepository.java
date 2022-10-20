package com.tasteshopping.wish.repository;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.wish.entity.WishLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<WishLists,Integer> {
    @Query("select w from WishLists w join fetch w.products p where w.user = :#{#paramUser}")
    List<WishLists> findByUser(@Param("paramUser")Users user);
    Optional<WishLists> findByUserAndProducts(Users users, Products products);
    Optional<WishLists> findByUserAndUid(Users users, Integer uid);
}
