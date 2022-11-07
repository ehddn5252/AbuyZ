package com.tasteshopping.event.repository;

import com.tasteshopping.event.entity.Events;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Events,Integer> {

    @EntityGraph(attributePaths = {"eventCouponLists","eventCouponLists.coupons","eventCouponLists.coupons.bigCategories"})
    List<Events> findAll();
    List<Events>findByEndDateAndStatus(Date yesterday, int status);
}
