package com.tasteshopping.dashboard.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.dashboard.dto.AnalysisDataDto;
import com.tasteshopping.dashboard.dto.SummaryDto;
import com.tasteshopping.review.dto.ReviewDto;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


public interface DashboardService {

   @Transactional
   void createTodayRow(String pageName);

   void doVisit(Date date, String pageName);

   @Transactional
   void cancelVisit(Date date, String pageName);

   AnalysisDataDto getVisit(Date date, String pageName);
   HashMap<String, Object> getDaily();

   List<SummaryDto> getSummary();

   List<ReviewDto> getCurrent();
   Integer getReportNum();

   int getNoReplyNum();

    BaseRes doVisitWithIp(String userIp);
}
