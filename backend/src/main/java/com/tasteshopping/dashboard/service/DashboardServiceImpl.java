package com.tasteshopping.dashboard.service;

import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.dashboard.dto.AnalysisDataDto;
import com.tasteshopping.dashboard.entity.AnalysisData;
import com.tasteshopping.dashboard.repository.AnalysisDataRepository;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.review.dto.ReviewDto;
import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.repository.ReportRepository;
import com.tasteshopping.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ReviewRepository reviewRepository;
    private final ReportRepository reportRepository;
    private final AnalysisDataRepository analysisRepository;
    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;

    @Transactional
    @Override
    public void createTodayRow(String pageName) {
        Date date = UtilService.getToday();
        AnalysisData analysisData = new AnalysisData();
        analysisData.modifyInfo(pageName, date);
        analysisRepository.save(analysisData);
    }

    @Transactional
    @Override
    public void doVisit(Date date, String pageName) {
        analysisRepository.findByDateAndPageName(date, pageName).get(0).visit();
    }

    @Override
    public AnalysisDataDto getVisit(Date date, String pageName) {
        List<AnalysisData> analysisData = analysisRepository.findByDateAndPageName(date, pageName);
        if (analysisData.size() >= 1) {
            return analysisRepository.findByDateAndPageName(date, pageName).get(0).toDto();
        } else {
            return null;
        }
    }

    @Override
    public HashMap<String, Object> getDaily() {
        List<String> pages = Arrays.asList(new String[]{"main", "login", "cart", "like", "register"});
        // 날짜별 주문 수, 매출액, 가입자 수, 방문자 수, 찜 수, 장바구니 수
        Date date = UtilService.getToday();
        HashMap<String, Object> h = new HashMap<>();
        for (String page : pages) {
            h.put(page, getVisit(date, page));
        }
        return addDailyOrder(h);
    }

    public HashMap<String, Object> addDailyOrder(HashMap<String, Object> h) {
//        Date date = UtilService.getToday();
        Date startDate = UtilService.getDateAfterDay(0);
        Date endDate = UtilService.getDateAfterDay(1);

        List<OrderLists> orderLists = orderListRepository.findByDateBetween(startDate, endDate);
        Integer totalPrice = 0;
        Integer count = 0;
        for (int i = 0; i < orderLists.size(); ++i) {
            count += orderRepository.findByOrderList(orderLists.get(i)).size();
            totalPrice += orderLists.get(i).getTotalPrice();
        }
        h.put("totalPrice", totalPrice);
        h.put("orderNum", count);
        return h;
    }


    @Override
    public List<ReviewDto> getCurrent() {
        List<Reviews> l = reviewRepository.findCurrent();
        List<ReviewDto> reviewDtos = new ArrayList<>();
        int size = 2;
        if (l.size() < 2) {
            size = l.size();
        }
        for (int i = 0; i < size; ++i) {
            reviewDtos.add(l.get(i).toDto());
        }
        return reviewDtos;
    }

    @Override
    public Integer getReportNum() {
        List<Reports> l = reportRepository.findAll();
        return l.size();
    }

    @Override
    public int getNoReplyNum() {
        // 답글이 안달린 개수 가져오기
        List<Reviews> reviewList = reviewRepository.findByParentReviewIsNull();
        List<Reviews> replyList = reviewRepository.findByParentReviewIsNotNull();
        int noReplyCount = reviewList.size();
        for (int i = 0; i < reviewList.size(); ++i) {
            for (int j = 0; j < replyList.size(); ++j) {
                if (reviewList.get(i).getUid() == replyList.get(j).getParentReview().getUid()) {
                    noReplyCount -= 1;
                    break;
                }
            }
        }
        return noReplyCount;
    }
}