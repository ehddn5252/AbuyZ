package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.OrderLists;
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

    @Query(value ="select * from order_lists where users_uid = :users_uid", nativeQuery = true)
    List<OrderLists> findByUsersUid(int users_uid);

    List<OrderLists> findAllByDateBetween(Date start_date, Date end_date);

}

