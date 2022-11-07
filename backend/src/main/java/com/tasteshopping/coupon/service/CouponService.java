package com.tasteshopping.coupon.service;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface CouponService {
    ResponseDto create(CouponDto couponDto);
    ResponseDto delete(String email,int coupon_uid);
    ResponseDto getMyCoupons(String email);
    ResponseDto getAvailableCoupons(String email,int big_category_id);
    ResponseDto getAllCoupons();
    ResponseDto deleteCoupon(int uid);
    ResponseDto issueCoupon(String email,int uid);
    ResponseDto modifyCoupon(String email, int uid,CouponDto couponDto);
}
