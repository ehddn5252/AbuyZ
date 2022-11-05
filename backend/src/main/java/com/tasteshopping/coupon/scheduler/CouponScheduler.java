package com.tasteshopping.coupon.scheduler;

import com.tasteshopping.coupon.entity.CouponLists;
import com.tasteshopping.coupon.repository.CouponListsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class CouponScheduler {
    private final CouponListsRepository couponListsRepository;
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void couponUpdate(){
        log.info("CouponScheduler start");

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        LocalDate yesterdayLocalDate = LocalDate.now().minusDays(1);
        Date yesterday = null;
        try {
            yesterday = formatter.parse(yesterdayLocalDate.toString());
        } catch (ParseException e) {
            log.warn("CouponScheduler ParseException");
            e.printStackTrace();
        }
        List<CouponLists> target = couponListsRepository.findByCoupons_EndDateAndStatus(yesterday,0);
        for(CouponLists couponList:target){
            couponList.updateStatus(2);
        }
        log.info("CouponScheduler finish");
    }
}