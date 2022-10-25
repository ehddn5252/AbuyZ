package com.tasteshopping.event.repository;

import com.tasteshopping.event.entity.EventCouponLists;
import com.tasteshopping.event.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventCouponListRepository extends JpaRepository<EventCouponLists,Integer> {
    List<EventCouponLists> findByEvents(Events events);
    void deleteByUidIn(List<Integer>ids);
}
