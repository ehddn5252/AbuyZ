package com.tasteshopping.coupon.service;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.service.CouponService;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.wish.entity.WishLists;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    @Override
    @Transactional
    public ResponseDto create(String email,CouponDto couponDto) {
        ResponseDto responseDto = new ResponseDto();


        responseDto.setMessage("추가 완료");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }


}
