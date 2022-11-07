package com.tasteshopping.coupon.service;

import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.repository.BigCategoryRepository;
import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.dto.CouponResDto;
import com.tasteshopping.coupon.dto.CouponResListDto;
import com.tasteshopping.coupon.entity.CouponLists;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.coupon.repository.CouponListsRepository;
import com.tasteshopping.coupon.repository.CouponRepository;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final BigCategoryRepository bigCategoryRepository;
    private final CouponRepository couponRepository;
    private final CouponListsRepository couponListsRepository;
    private final UserRepository userRepository;
    @Override
    @Transactional
    public ResponseDto create(CouponDto couponDto) {
        ResponseDto responseDto =new ResponseDto();
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
    @Override
    @Transactional
    public ResponseDto delete(String email, int coupon_uid) {
        ResponseDto responseDto = new ResponseDto();

        Optional<CouponLists> coupons = couponListsRepository.findByCouponsUidAndUserEmail(coupon_uid,email);
        if(!coupons.isPresent()){
            responseDto.setMessage("삭제 실패 : 존재하지 않는 쿠폰");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        couponListsRepository.delete(coupons.get());
        responseDto.setMessage("삭제 완료");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }
    @Override
    public ResponseDto getMyCoupons(String email) {
        List<CouponLists> search_result = couponListsRepository.findByUserEmailOrderByStatusAscCoupons_StartDate(email);
        return toDto(search_result);
    }

    @Override
    public ResponseDto getAvailableCoupons(String email, int big_category_id) {
        List<CouponLists> search_result = couponListsRepository.findByUserEmailAndCoupons_BigCategoriesUidAndStatusOrderByStatusAscCoupons_StartDate(email,big_category_id,0);
        return toDto(search_result);
    }

    @Transactional
    public ResponseDto toDto(List<CouponLists> search_result){
        ResponseDto responseDto = new ResponseDto();
        CouponResListDto couponResListDto = new CouponResListDto(new ArrayList<>(),0);

        for(CouponLists couponLists:search_result){
            couponResListDto.getResult().add(couponLists.toCouponsResDto());
        }
        couponResListDto.setCount(search_result.size());
        responseDto.setData(couponResListDto);
        responseDto.setMessage("조회성공");
        return responseDto;
    }
    @Override
    public ResponseDto getAllCoupons(){
        ResponseDto responseDto = new ResponseDto();
        List<Coupons>findCoupons = couponRepository.findAll();
        List<CouponResDto>result = findCoupons.stream().map(Coupons::toDto).collect(Collectors.toList());
        responseDto.setData(result);
        responseDto.setMessage("조회 성공");
        return responseDto;
    }
    @Transactional
    @Override
    public ResponseDto deleteCoupon(int uid){
        ResponseDto responseDto = new ResponseDto();
        couponRepository.deleteById(uid);
        responseDto.setMessage("삭제 완료");
        return responseDto;
    }
    @Transactional
    @Override
    public ResponseDto issueCoupon(String email,int uid){
        ResponseDto responseDto = new ResponseDto();
        Optional<CouponLists>findCoupon = couponListsRepository.findByUserEmailAndCouponsUid(email,uid);
        if(findCoupon.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("발급 실패: 이미 발급받은 쿠폰입니다.");
            responseDto.setStatus(204);
            return responseDto;
        }
        Users users = userRepository.findByEmail(email).get();
        Coupons coupons = couponRepository.findById(uid).get();
        CouponLists couponLists = CouponLists.builder()
                .coupons(coupons)
                .user(users)
                .build();
        couponListsRepository.save(couponLists);
        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("발급 성공");
        return responseDto;
    }
    @Transactional
    @Override
    public ResponseDto modifyCoupon(String email, int uid,CouponDto couponDto){
        ResponseDto responseDto = new ResponseDto();
        Optional<Coupons>findCoupon = couponRepository.findById(uid);
        if(!findCoupon.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("수정 실패: 잘못된 쿠폰번호입니다.");
            responseDto.setStatus(204);
            return responseDto;
        }
        Optional<BigCategories> findBigCategories =bigCategoryRepository.findById(couponDto.getBig_categories_uid());
        if(!findBigCategories.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("수정 실패: 잘못된 카테고리입니다.");
            responseDto.setStatus(204);
            return responseDto;
        }
        BigCategories bigCategories = findBigCategories.get();
        Coupons coupon = findCoupon.get();
        coupon.update(couponDto,bigCategories);
        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("수정 성공");
        return responseDto;
    }
}