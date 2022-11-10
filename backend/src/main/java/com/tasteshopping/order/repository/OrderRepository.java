package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer> {
    @Query(value = "select max(uid) from orders", nativeQuery = true)
    Integer findMaxUid();

    @EntityGraph(attributePaths = {"review","orderList","inventory","inventory.product","inventory.product.smallCategory",
    "inventory.product.smallCategory.bigCategory"})
    List<Orders> findByOrderList_DateBetween(Date start_date,Date end_date);

    @Query("select o from Orders o join fetch Reviews r on o.review=r where o.orderList=:orderList")
    List<Orders> findByOrderList(OrderLists orderList);

    List<Orders> findByStatus(String status);
}
