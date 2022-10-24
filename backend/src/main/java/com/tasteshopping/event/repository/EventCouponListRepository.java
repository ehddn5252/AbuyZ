package com.tasteshopping.event.repository;

import com.tasteshopping.event.entity.EventCouponLists;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventCouponListRepository extends JpaRepository<EventCouponLists,Integer> {

}
