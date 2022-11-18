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

@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer> {

    @EntityGraph(attributePaths = {"review","orderList","inventory","inventory.product","inventory.product.smallCategory",
    "inventory.product.smallCategory.bigCategory"})
    List<Orders> findByOrderList_DateBetweenAndStatusNotIn(Date start_date,Date end_date, List status);

//    @Query("select o from Orders o join fetch o.review r where o.orderList=:orderList")
    @Query("select o from Orders o join fetch Inventories i on o.inventory = i  where o.orderList=:orderList")
    List<Orders> findByOrderList(OrderLists orderList);

    @EntityGraph(attributePaths = {"inventory","review"})
    List<Orders> findByOrderListAndStatusIn(OrderLists orderList, List status);

    @Query("select o from Orders o join fetch o.review r where o.status=:status")
    List<Orders> findByStatus(String status);

    @Query(value = "select * from order_lists ol left join orders o on ol.uid = o.order_lists_uid left join reviews r on o.uid = r.orders_uid where o.uid not in (select coalesce(orders_uid ,0) from reviews r2) and ol.users_uid=:userUid",nativeQuery = true)
    List<Orders> findMyOrderByNoReview(int userUid);
}
