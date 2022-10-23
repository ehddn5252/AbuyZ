package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderListRepository extends JpaRepository<OrderLists, Integer> {
    @Query(value = "select max(uid) from order_lists", nativeQuery = true)
    Integer findMaxUid();
}

