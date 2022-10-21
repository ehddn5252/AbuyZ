package com.tasteshopping.coupon.repository;

import com.tasteshopping.coupon.entity.Coupons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupons,Integer> {
}