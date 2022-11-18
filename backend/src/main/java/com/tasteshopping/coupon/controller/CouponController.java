package com.tasteshopping.coupon.controller;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.service.CouponServiceImpl;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/coupon")
@RequiredArgsConstructor
public class CouponController {
    private final CouponServiceImpl couponService;
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> getInfo(@RequestBody CouponDto couponDto){
        return new ResponseEntity<>(couponService.create(couponDto), HttpStatus.OK);
    }
    @DeleteMapping("/{coupon_uid}")
    public ResponseEntity<ResponseDto>delete(@AuthenticationPrincipal String email,
                                             @PathVariable int coupon_uid){
        return new ResponseEntity<>(couponService.delete(email, coupon_uid), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<ResponseDto>getMyCoupons(@AuthenticationPrincipal String email){
        return new ResponseEntity<>(couponService.getMyCoupons(email),HttpStatus.OK);
    }
    @GetMapping("/available-coupons/{big_categories_uid}")
    public ResponseEntity<ResponseDto>getAvailableCoupons(@AuthenticationPrincipal String email,
                                                          @PathVariable int big_categories_uid){
        return new ResponseEntity<>(couponService.getAvailableCoupons(email,big_categories_uid),HttpStatus.OK);
    }
    @GetMapping("/list")
    private ResponseEntity<ResponseDto>getAllCoupons(){
        return new ResponseEntity<>(couponService.getAllCoupons(),HttpStatus.OK);
    }
    @DeleteMapping("/list/{coupon_uid}")
    private ResponseEntity<ResponseDto>deleteCoupon(@PathVariable int coupon_uid){
        return new ResponseEntity<>(couponService.deleteCoupon(coupon_uid),HttpStatus.OK);
    }
    @GetMapping("/{coupon_uid}")
    private ResponseEntity<ResponseDto>issueCoupon(@AuthenticationPrincipal String email,
                                                   @PathVariable int coupon_uid){
        return new ResponseEntity<>(couponService.issueCoupon(email,coupon_uid),HttpStatus.OK);
    }
    @PutMapping("/modify/{coupon_uid}")
    private ResponseEntity<ResponseDto>modifyCoupon(@AuthenticationPrincipal String email,
                                                    @PathVariable int coupon_uid,
                                                    @RequestBody CouponDto couponDto){
        return new ResponseEntity<>(couponService.modifyCoupon(email,coupon_uid,couponDto),HttpStatus.OK);
    }
}
