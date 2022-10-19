package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer> {
    @Query(value = "select max(uid) from orders", nativeQuery = true)
    Integer findMaxUid();
}
