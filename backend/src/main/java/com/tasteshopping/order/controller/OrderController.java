package com.tasteshopping.order.controller;

import com.tasteshopping.cart.exception.OutOfStockException;
import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartReqDto;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.dto.*;
import com.tasteshopping.order.service.OrderListService;
import com.tasteshopping.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderListService orderListService;

    @GetMapping("")
    public ResponseEntity<BaseRes> getOrderLists(@AuthenticationPrincipal String email) {
        List<OrderListDto> orderListDtos = orderListService.getOrderLists(email);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "server test 성공!",orderListDtos));
    }

    @GetMapping("/{order_lists_uid}")
    public ResponseEntity<BaseRes> getOrdersFromOrderList(@AuthenticationPrincipal String email, @PathVariable Integer order_lists_uid) {
        return ResponseEntity.status(HttpStatus.OK).body(orderListService.getOrder(email,order_lists_uid));
    }

    @PutMapping("/status")
    public ResponseEntity<BaseRes> changeStatus(@AuthenticationPrincipal String email,@RequestBody OrderUidReqDto orderUidReqDto){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.changeStatus(orderUidReqDto.getOrder_uid(),orderUidReqDto.getStatus()));
    }

    @PostMapping("/cancel")
    public ResponseEntity<BaseRes> cancelPay(@AuthenticationPrincipal String email, @RequestBody OrderUidReqDto orderCancelReqDto){
        // ORDER의 상태에는 PROCESS,
        // 관리자가 취소 누르는 것
        return ResponseEntity.status(HttpStatus.OK).body(orderService.orderCancel(orderCancelReqDto.getOrder_uid()));
    }

    @PostMapping("/cancel-register")
    public ResponseEntity<BaseRes> cancelRegister(@AuthenticationPrincipal String email, @RequestBody AdminOrderCancelReqDto adminOrderCancelReqDto){
        // 사용자가 취소 누르는 것 ( order 의 status를 취소 요청으로(CANCEL_REQUEST)
        return ResponseEntity.status(HttpStatus.OK).body(orderService.orderRegisterCancel(adminOrderCancelReqDto.getOrder_uids()));
    }

    @PostMapping("/cart")
    public ResponseEntity<BaseRes> cartPay(@AuthenticationPrincipal String email){
        try{
            orderService.cartPay(email);
        }
        catch (OutOfStockException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(BaseRes.of(406, "남은 재고가 없습니다."));
        }
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "결제하기 성공!"));
    }

    @PostMapping("/basic")
    public ResponseEntity<BaseRes> basicPay(@AuthenticationPrincipal String email,@RequestBody CartReqDto cartReqDto){
        CartDto cartDto = cartReqDto.toDto();
        orderService.basicPay(email,cartDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "결제하기 성공!"));
    }


    @GetMapping("/success")
    public ResponseEntity<BaseRes> kakaoSuccess( @RequestParam String pg_token) {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "kakao test 성공!",pg_token));
    }
    @GetMapping("/fail")
    public ResponseEntity<BaseRes> kakaoFail() {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(BaseRes.of(400, "kakao test 실패!"));
    }

    @GetMapping("/cancel")
    public ResponseEntity<BaseRes> kakaoCancel() {
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(BaseRes.of(406, "kakao test 취소!"));
    }

    @GetMapping("/lastOrder")
    public ResponseEntity<BaseRes> getLastOrder() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "kakao test 성공!"));
    }
}
