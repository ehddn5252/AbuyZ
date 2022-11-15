package com.tasteshopping.coupon.repository;

import com.tasteshopping.coupon.entity.CouponLists;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CouponListsRepository extends JpaRepository<CouponLists,Integer> {
    @EntityGraph(attributePaths = {"coupons.bigCategories","user","coupons"})
    List<CouponLists> findByUserEmailOrderByStatusAscCoupons_StartDate(String email);
    @EntityGraph(attributePaths = {"coupons.bigCategories","user","coupons"})
    List<CouponLists> findByUserEmailAndCoupons_BigCategoriesUidAndStatusOrderByStatusAscCoupons_StartDate(String email,int uid,int status);
    @EntityGraph(attributePaths = {"user","coupons"})
    Optional<CouponLists>findByUserEmailAndCouponsUid(String email, int uid);
    @EntityGraph(attributePaths = {"user","coupons"})
    Optional<CouponLists> findByCouponsUidAndUserEmail(int id,String email);
    @EntityGraph(attributePaths = {"user","coupons"})
    List<CouponLists> findByCoupons_EndDateAndStatus(Date yesterday,int status);

    CouponLists findByCouponsAndUser(Coupons coupons, Users user);
}