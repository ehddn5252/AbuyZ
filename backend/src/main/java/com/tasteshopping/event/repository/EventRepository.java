package com.tasteshopping.event.repository;

import com.tasteshopping.event.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Events,Integer> {

}
