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

    @EntityGraph(attributePaths = {"review","orderList","inventory","inventory.product","inventory.product.smallCategory",
    "inventory.product.smallCategory.bigCategory"})
    List<Orders> findByOrderList_DateBetweenAndStatusNotIn(Date start_date,Date end_date, List status);

//    @Query("select o from Orders o join fetch o.review r where o.orderList=:orderList")
    @Query("select o from Orders o join fetch Inventories i on o.inventory = i  where o.orderList=:orderList")
    List<Orders> findByOrderList(OrderLists orderList);

    @EntityGraph(attributePaths = {"inventory","review"})
    List<Orders> findByOrderListAndStatusNotIn(OrderLists orderList, List status);

    @Query("select o from Orders o join fetch o.review r where o.status=:status")
    List<Orders> findByStatus(String status);
}
