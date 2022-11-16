package com.tasteshopping.dashboard.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.common.service.RedisService;
import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.dashboard.dto.AnalysisDataDto;
import com.tasteshopping.dashboard.dto.SummaryDto;
import com.tasteshopping.dashboard.entity.AnalysisData;
import com.tasteshopping.dashboard.repository.AnalysisDataRepository;
import com.tasteshopping.inquiry.Exception.AreadyAccessException;
import com.tasteshopping.order.dto.OrderStatus;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
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

    private final RedisService redisService;

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
        System.out.println(date);
        System.out.println(pageName);
        analysisRepository.findByDateAndPageName(date, pageName).get(0).visit();
    }

    @Transactional
    @Override
    public void cancelVisit(Date date, String pageName) {
        analysisRepository.findByDateAndPageName(date, pageName).get(0).cancelVisit();
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
            h.put(page, getVisit(date, page).getVisitCount());
        }
        return addDailyOrder(h);
    }

    public HashMap<String, Object> addDailyOrder(HashMap<String, Object> h) {
//        Date date = UtilService.getToday();
        Date startDate = UtilService.getDateTimeAfterDay(0);
        Date endDate = UtilService.getDateTimeAfterDay(1);

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
    public List<SummaryDto> getSummary() {
        List<String> pages = Arrays.asList(new String[]{"main", "login", "cart", "like", "register"});
        // 날짜별 주문 수, 매출액, 가입자 수, 방문자 수, 찜 수, 장바구니 수
        int CURRENT_SUMMARIZE_SIZE = 5;
        ArrayList<SummaryDto> l = new ArrayList<>();
        for (int i = 0; i < CURRENT_SUMMARIZE_SIZE; ++i) {
            SummaryDto summaryDto = new SummaryDto();
            Date date = UtilService.getDateTimeAfterDay(-i);
            summaryDto.setDate(date);
            summaryDto.setVisitMainNum(getVisit(date, "main").getVisitCount());
            summaryDto.setLoginNum(getVisit(date, "login").getVisitCount());
            summaryDto.setClickLikeNum(getVisit(date, "like").getVisitCount());
            summaryDto.setPutCartNum(getVisit(date, "cart").getVisitCount());
            summaryDto.setRegisterNum(getVisit(date, "register").getVisitCount());
            summaryDto = addDailyOrder(summaryDto, -i);
            l.add(summaryDto);
        }
        return l;
    }

    public SummaryDto addDailyOrder(SummaryDto summaryDto,int day) {
//        Date date = UtilService.getToday();
        Date startDate = UtilService.getDateAfterDay(day);
        Date endDate = UtilService.getDateAfterDay(day+1);
        System.out.println("startDate: "+startDate +"\n endDate: "+endDate);
        List<OrderLists> orderLists = orderListRepository.findByDateBetween(startDate, endDate);
        Integer totalPrice = 0;
        Integer count = 0;
        for (int i = 0; i < orderLists.size(); ++i) {
            // 여기에서 오더가 아닌 것들 가져와야 함.
            // JPA  조건문 변경
            totalPrice += orderLists.get(i).getTotalPrice();
            List<Orders> orders = orderRepository.findByOrderList(orderLists.get(i));
            for (int j = 0; j < orders.size(); ++j) {
                String status = orders.get(j).getStatus();
                if (status.equals(OrderStatus.PROCESS.toString()) || status.equals(OrderStatus.SOLD.toString())) {
                    count += 1;
                }
            }
        }
        summaryDto.setOrderNum(count);
        summaryDto.setTotalPrice(totalPrice);
        return summaryDto;
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

    @Override
    @Transactional
    public BaseRes doVisitWithIp(String userIp) {
        List<String> l = redisService.getSetData("userIp");
        boolean isNotChecked = true;
        for (String s : l) {
            if (s.equals(userIp)) {
                isNotChecked = false;
            }
        }
        if (isNotChecked) {
            System.out.println("is not checked");
            redisService.addData("userIp", userIp);
            doVisit(UtilService.getToday(), "main");
            return new BaseRes(200, "조회수 증가 성공", null);
        } else {
            throw new AreadyAccessException();
        }
    }
}
