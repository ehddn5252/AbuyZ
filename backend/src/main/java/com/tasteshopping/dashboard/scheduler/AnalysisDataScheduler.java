package com.tasteshopping.dashboard.scheduler;

import com.tasteshopping.common.service.RedisService;
import com.tasteshopping.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class AnalysisDataScheduler {

    private final DashboardService dashboardService;

    private final RedisService redisService;

    @Scheduled(cron = "0 0 0 * * ?")// 매 00:00 실행
    @Transactional
    public void dailyAnalysisDataUpdate() {

        List<String> pages = Arrays.asList(new String[]{"main", "login", "cart", "like", "register"});
        try {
            for (String page : pages) {
                System.out.println(page);
                dashboardService.createTodayRow(page);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")// 매 00:00 실행
    @Transactional
    public void dailyVisitorUpdate() {
        redisService.createSetDataForm("userIp", "127.0.0.1", 3600 * 23 + 3597L);
    }
}
