package com.tasteshopping.coupon.service;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.coupon.repository.CouponRepository;
import com.tasteshopping.product.entity.BigCategories;
import com.tasteshopping.product.repository.BigCategoryRepository;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final BigCategoryRepository bigCategoryRepository;
    private final CouponRepository couponRepository;
    @Override
    @Transactional
    public ResponseDto create(String email,CouponDto couponDto) {
        ResponseDto responseDto = new ResponseDto();
        Optional<BigCategories> bigCategories =bigCategoryRepository.findById(couponDto.getBig_categories_uid());
        if(!bigCategories.isPresent()){
            responseDto.setMessage("추가 실패 : 잘못된 카테고리");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        Coupons coupons = couponDto.toEntity(bigCategories.get());
        if(coupons==null){
            responseDto.setMessage("추가 실패 : 잘못된 날짜양식");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        couponRepository.save(coupons);
        responseDto.setMessage("추가 완료");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }
}