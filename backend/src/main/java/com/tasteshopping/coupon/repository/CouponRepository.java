package com.tasteshopping.coupon.repository;

import com.tasteshopping.coupon.entity.Coupons;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupons,Integer> {
    List<Coupons> findByUidIn(@Param("uid") List<Integer> coupons_uid);
}