package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer> {
    @Query(value = "select max(uid) from orders", nativeQuery = true)
    Integer findMaxUid();

    @Query("select o from Orders o " +
            "join fetch o.orderList ol " +
            "join fetch o.inventory i " +
            "join fetch i.product p " +
            "join fetch p.smallCategory s " +
            "join fetch s.bigCategory b " +
            "where ol.date between :#{#start_date} and :#{#end_date}")
    List<Orders> findAllByDateBetween(@Param("start_date")Date start_date, @Param("end_date")Date end_date);

    List<Orders> findByOrderList(OrderLists orderList);
}
