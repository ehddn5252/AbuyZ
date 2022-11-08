package com.tasteshopping.dashboard.scheduler;

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
}
