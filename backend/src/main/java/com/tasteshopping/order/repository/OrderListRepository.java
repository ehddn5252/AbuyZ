package com.tasteshopping.order.repository;

import com.tasteshopping.dashboard.dto.CountAndPriceDto;
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

    @Query(value = "select ol from OrderLists ol join fetch Orders o on o.orderList= ol where ol.uid=:orderListsUid")
    Optional<OrderLists> findFetchJoinById(int orderListsUid);
    List<OrderLists> findByUser(Users user);

    List<OrderLists> findByDate(Date date);

    Optional<OrderLists> findByOrders(Orders order);

    @EntityGraph(attributePaths = {"orders","orders.review"})
    List<OrderLists>findByDateBetweenAndOrders_StatusNotIn(Date start_date,Date end_date, List status);

    @EntityGraph(attributePaths = {"orders","orders.review"})
    List<OrderLists>findByDateBetween(Date start_date,Date end_date);

//    @Query(value = "select new com.tasteshopping.dashboard.dto.CountAndPriceDto(coalesce(COUNT(o.uid),0) ,coalesce(SUM(o.price),0)) from OrderLists ol inner join Orders o on o.orderList = ol where (o.status='PROCESS' or o.status='SOLD') and ol.date between :start_date and :end_date")
//    CountAndPriceDto getPriceAndCount(Date start_date, Date end_date);


    List<OrderLists> findByUserAndDateBetween(Users user, Date startDay, Date today);
}

