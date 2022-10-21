package com.tasteshopping.coupon.service;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.dto.CouponResListDto;
import com.tasteshopping.coupon.dto.CouponUidDto;
import com.tasteshopping.coupon.entity.CouponLists;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.coupon.repository.CouponListsRepository;
import com.tasteshopping.coupon.repository.CouponRepository;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.repository.BigCategoryRepository;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final BigCategoryRepository bigCategoryRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;
    private final CouponListsRepository couponListsRepository;
    @Override
    @Transactional
    public ResponseDto create(String email,CouponDto couponDto) {
        ResponseDto responseDto = check(email);
        if(responseDto!=null){
            return responseDto;
        }
        responseDto = new ResponseDto();
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
    public ResponseDto delete(String email, CouponUidDto couponUidDto) {
        ResponseDto responseDto = check(email);
        if(responseDto!=null){
            return responseDto;
        }
        responseDto = new ResponseDto();

        Optional<Coupons> coupons = couponRepository.findById(couponUidDto.getCoupon_uid());
        if(!coupons.isPresent()){
            responseDto.setMessage("추가 실패 : 존재하지 않는 쿠폰");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        couponRepository.delete(coupons.get());
        responseDto.setMessage("삭제 완료");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }
    @Override
    public ResponseDto getMyCoupons(String email) {
        List<CouponLists> search_result = couponListsRepository.findCouponListsByUserEmail(email);
        return toDto(search_result);
    }

    @Override
    public ResponseDto getAvailableCoupons(String email, int big_category_id) {
        List<CouponLists> search_result = couponListsRepository.findCouponListsByUserEmailAndCategory(email,big_category_id);
        return toDto(search_result);
    }

    private ResponseDto check(String email){
        ResponseDto responseDto = new ResponseDto();
        Users users = userRepository.findByEmail(email).get();
        if(users.getUserRoles()!= Role.ADMIN){
            responseDto.setMessage("추가 실패 : 궏한없음");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        return null;
    }
    @Transactional
    public ResponseDto toDto(List<CouponLists> search_result){
        ResponseDto responseDto = new ResponseDto();
        CouponResListDto couponResListDto = new CouponResListDto();
        Date now_date;
        try {
            String now = LocalDateTime.now().toString();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            now_date = format.parse(now);
        }
        catch (ParseException e){
            e.printStackTrace();
            responseDto.setData(null);
            responseDto.setMessage("Parsing Error");
            return responseDto;
        }
        for(CouponLists couponLists:search_result){
            if(couponLists.getStatus()==0&&couponLists.getCoupons().getEndDate().after(now_date)){
                couponLists.updateStatus(2);
                couponListsRepository.save(couponLists);
            }
            couponResListDto.getResult().add(couponLists.toCouponsResDto());
        }
        responseDto.setData(couponResListDto);
        return responseDto;
    }
}