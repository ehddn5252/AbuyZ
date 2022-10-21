package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.Revenues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RevenueRepository extends JpaRepository<Revenues,Integer> {
    List<Revenues> findAllByDateBetween(Date start_date, Date end_date);
}
