package com.tasteshopping.order.controller;

import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.dto.OrderReqDto;
import com.tasteshopping.order.dto.OrderReqDtoTest;
import com.tasteshopping.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/register")
    public ResponseEntity<BaseRes> test() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "server test 성공!"));
    }

    @PostMapping("/cart/test")
    public ResponseEntity<BaseRes> cartPayTest(@RequestBody OrderReqDtoTest orderReqDtoTests){
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("in cartPay");
        System.out.println(orderReqDtoTests);
        System.out.println("==================");
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "결재하기 성공!"));
    }


    @PostMapping("/cart")
    public ResponseEntity<BaseRes> cartPay(@RequestBody List<OrderReqDto> orderReqDtos){
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("in cartPay");
        System.out.println(orderReqDtos);
        System.out.println("==================");

        List<CartResDto> cartResDtoList = new ArrayList<>();
        for(int i = 0; i< orderReqDtos.size(); ++i){
            cartResDtoList.add(orderReqDtos.get(i).toCartResDto());
        }
        orderService.cartPay(cartResDtoList);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "결재하기 성공!"));
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
