package com.tasteshopping.coupon.controller;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.service.CouponService;
import com.tasteshopping.coupon.service.CouponServiceImpl;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/coupon")
@RequiredArgsConstructor
public class CouponController {
    private final CouponServiceImpl couponService;
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> getInfo(@AuthenticationPrincipal String email,
                                               @RequestBody CouponDto couponDto){
        return new ResponseEntity<>(couponService.create(email, couponDto), HttpStatus.OK);
    }

}
