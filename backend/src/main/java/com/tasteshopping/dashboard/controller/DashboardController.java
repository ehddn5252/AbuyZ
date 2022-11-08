package com.tasteshopping.dashboard.controller;

import com.tasteshopping.common.dto.BaseRes;

import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.dashboard.service.DashboardService;
import com.tasteshopping.inquiry.service.CustomerCenterService;
import com.tasteshopping.inventory.service.InventoryService;
import com.tasteshopping.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;
    private final InventoryService inventoryService;
    private final CustomerCenterService customerCenterService;
    private final DashboardService dashboardService;


    @GetMapping("/visit/{pageName}")
    public ResponseEntity<BaseRes> getTodayVisit(@AuthenticationPrincipal String email, @PathVariable String pageName) {
        Date date = UtilService.getToday();
        System.out.println(pageName);
        System.out.println(pageName);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "order 상태에 맞는 order 개수 가져오기 성공!", dashboardService.getVisit(date, pageName)));
    }

    @PutMapping("/visit/{pageName}")
    public ResponseEntity<BaseRes> doTodayVisit(@AuthenticationPrincipal String email, @PathVariable String pageName) {
        Date date = UtilService.getToday();
        dashboardService.doVisit(date, pageName);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "오늘 일자 방문 성공!"));
    }

    @GetMapping("/visit/{date}/{pageName}")
    public ResponseEntity<BaseRes> getVisit(@AuthenticationPrincipal String email, @PathVariable String pageName, @PathVariable Date date) {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "조회 성공!", dashboardService.getVisit(date, pageName)));
    }

    @PutMapping("/visit/{date}/{pageName}")
    public ResponseEntity<BaseRes> doVisit(@AuthenticationPrincipal String email, @PathVariable String pageName, @PathVariable Date date) {
        dashboardService.doVisit(date, pageName);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "방문 성공!", null));
    }


    @GetMapping("/to-do")
    public ResponseEntity<BaseRes> getByStatus(@AuthenticationPrincipal String email) {
        // 상품 상태로로 검색한 기록
        // 상품 상태 정보 WAITING, PROCESS, END, CANCELED
//        int processNum = orderService.getNumByStatus("PROCESS");
        // 1. 승인 대기중 상품 개수
        Integer waitNum = orderService.getNumByStatus("PROCESS");
        // 2. 답변 미완료 개수
        Integer noReplyNum = customerCenterService.getNoReplyNum("답변_미완료");
        // 3. 신고 리뷰 개수
        Integer reportReviewNum = dashboardService.getReportNum();
        // 4. 주문 취소(교환/환불) 신청 개수
        Integer statusNum = orderService.getNumByStatus("CANCELED");
        // 5. 신규 리뷰수(답장을 안한 리뷰)
        Integer newReviewNum = dashboardService.getNoReplyNum();
        // 6. 품절 상품 개수
        Integer inventoryCount0num = inventoryService.getEmptyNum();
        // 최근 리뷰
        HashMap<String, Object> h = new HashMap<>();
        h.put("waitNum", waitNum);
        h.put("noReplyNum", noReplyNum);
        h.put("reportReviewNum", reportReviewNum);
        h.put("statusNum", statusNum);
        h.put("newReviewNum", newReviewNum);
        h.put("inventoryCount0num", inventoryCount0num);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "order 상태에 맞는 order 개수 가져오기 성공!", h));
    }

    @GetMapping("/daily")
    public ResponseEntity<BaseRes> getCurrentReview(@AuthenticationPrincipal String email) {
        
        // 5일 기준으로
        return ResponseEntity.status(HttpStatus.OK).body(new BaseRes(200, "분석 데이터 제공 성공.",dashboardService.getSummary()));
    }

    @GetMapping("/list")
    public ResponseEntity<BaseRes> getList(@AuthenticationPrincipal String email) {
        HashMap<String, Object> h = new HashMap<>();
        h.put("customerCenter", customerCenterService.getCurrent());
        h.put("review", dashboardService.getCurrent());
        return ResponseEntity.status(HttpStatus.OK).body(new BaseRes(200, "최근 고객센터 + 리뷰", h));
    }
}
