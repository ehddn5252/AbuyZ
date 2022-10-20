package com.tasteshopping.wish.repository;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.wish.entity.WishLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<WishLists,Integer> {
    List<WishLists> findByUser(Users user);
    Optional<WishLists> findByUserAndProducts(Users users, Products products);
}
