package com.tasteshopping.event.repository;

import com.tasteshopping.event.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Events,Integer> {

    @Query("select e from Events e " +
            "join fetch e.eventCouponLists ecl " +
            "join fetch ecl.coupons c " +
            "join fetch c.bigCategories bc ")
    List<Events> findAll();
}
