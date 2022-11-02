package com.tasteshopping.order.repository;

import com.tasteshopping.order.entity.Revenues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RevenueRepository extends JpaRepository<Revenues,Integer> {
    @Query("select r from Revenues r " +
            "join fetch r.order " +
            "where r.date between :#{#start_date} and :#{#end_date} " +
            "order by r.date")
    List<Revenues> findAllByDateBetween(@Param("start_date")Date start_date, @Param("end_date")Date end_date);
}
