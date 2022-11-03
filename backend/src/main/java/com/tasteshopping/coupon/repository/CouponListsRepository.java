package com.tasteshopping.coupon.repository;

import com.tasteshopping.coupon.entity.CouponLists;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CouponListsRepository extends JpaRepository<CouponLists,Integer> {
    @Query("select cl from CouponLists cl " +
            "join fetch cl.coupons c " +
            "join fetch c.bigCategories bc " +
            "where cl.user.email = :#{#email}")
    List<CouponLists> findCouponListsByUserEmail(@Param("email")String email);

    @Query("select cl from CouponLists cl " +
            "join fetch cl.coupons c " +
            "join fetch c.bigCategories bc " +
            "where cl.user.email = :#{#email} " +
            "and bc.uid = :#{#category} " +
            "and cl.status=0")
    List<CouponLists> findCouponListsByUserEmailAndCategory(@Param("email")String email,@Param("category")int category);
    @EntityGraph(attributePaths = {"user","coupons"})
    Optional<CouponLists>findByUserEmailAndCouponsUid(String email, int uid);
    @EntityGraph(attributePaths = {"user"})
    Optional<CouponLists> findByUidAndUserUid(Integer id,String email);
}