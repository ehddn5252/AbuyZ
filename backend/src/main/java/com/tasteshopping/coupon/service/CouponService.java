package com.tasteshopping.coupon.service;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface CouponService {
    ResponseDto create(String email, CouponDto couponDto);

}
