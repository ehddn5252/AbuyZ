package com.tasteshopping.dashboard.controller;

import com.tasteshopping.common.dto.BaseRes;

import com.tasteshopping.dashboard.service.DashboardService;
import com.tasteshopping.inquiry.Exception.NoInquiryException;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.service.CustomerCenterService;
import com.tasteshopping.inventory.service.InventoryService;
import com.tasteshopping.order.service.OrderService;
import com.tasteshopping.review.dto.ReviewDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;
    private final InventoryService inventoryService;
    private final CustomerCenterService customerCenterService;
    private final DashboardService dashboardService;

    @GetMapping("/to-do")
    public ResponseEntity<BaseRes> getByStatus(@AuthenticationPrincipal String email) {
        // 상품 상태로로 검색한 기록
        // 상품 상태 정보 WAITING, PROCESS, END, CANCELED
//        int processNum = orderService.getNumByStatus("PROCESS");
        // 1. 승인 대기중 상품 개수
        int waitNum = orderService.getNumByStatus("PROCESS");
        // 2. 답변 미완료 개수
        int noReplyNum = customerCenterService.getNoReplyNum("답변_미완료");
        // 3. 신고 리뷰 개수
        Integer reportReviewNum = dashboardService.getReportNum();
        // 4. 주문 취소(교환/환불) 신청 개수
        int statusNum = orderService.getNumByStatus("CANCELED");
        // 5. 신규 리뷰수(답장을 안한 리뷰)
        int newReviewNum = dashboardService.getNoReplyNum();
        // 6. 품절 상품 개수
        Integer inventoryCount0num = inventoryService.getEmptyNum();
        // 최근 리뷰
        List l = new ArrayList(){}
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "order 상태에 맞는 order 개수 가져오기 성공!",newReviewNum));
    }

    @GetMapping("/inquiry")
    public ResponseEntity<BaseRes> getCurrentInquiry(@AuthenticationPrincipal String email){
        // 8. 최근 문의 리스트
        return ResponseEntity.status(HttpStatus.OK).body(new BaseRes(200, "최근 문의 리스트.",customerCenterService.getCurrent()));
    }

    @GetMapping("/review")
    public ResponseEntity<BaseRes> getCurrentReview(@AuthenticationPrincipal String email){
        List<ReviewDto> l = dashboardService.getReviews();
        // 8. 최근 문의 리스트
        return ResponseEntity.status(HttpStatus.OK).body(new BaseRes(200, "최근 문의 리스트.",l));
    }


}
