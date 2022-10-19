package com.tasteshopping.order.controller;

import com.tasteshopping.common.dto.BaseRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {


    @PostMapping("/register")
    public ResponseEntity<BaseRes> test() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @GetMapping("/success")
    public ResponseEntity<BaseRes> kakaoSuccess(@RequestParam String pg_token) {

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
