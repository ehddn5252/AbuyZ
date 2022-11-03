package com.tasteshopping.coupon.service;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface CouponService {
    ResponseDto create(String email, CouponDto couponDto);
    ResponseDto delete(String email,int coupon_uid);
    ResponseDto getMyCoupons(String email);
    ResponseDto getAvailableCoupons(String email,int big_category_id);
}
