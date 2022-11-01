package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderListRepository extends JpaRepository<OrderLists, Integer> {
    @Query(value = "select max(uid) from order_lists", nativeQuery = true)
    Integer findMaxUid();

    List<OrderLists> findByUser(Users user);

    List<OrderLists> findAllByDateBetween(Date start_date, Date end_date);

    List<OrderLists> findByDate(Date date);

    Optional<OrderLists> findByOrders(Orders order);

    @EntityGraph(attributePaths = {"orders"})
    List<OrderLists>findByDateBetween(Date start_date,Date end_date);
}

