package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.OrderLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderListRepository extends JpaRepository<OrderLists,Integer> {
    List<OrderLists> findAllByDateBetween(Date start_date, Date end_date);
}
