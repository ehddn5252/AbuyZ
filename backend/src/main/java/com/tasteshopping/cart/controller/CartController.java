package com.tasteshopping.cart.controller;

import com.tasteshopping.cart.dto.*;
import com.tasteshopping.cart.service.CartService;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.user.entity.Users;
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
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    @Autowired
    CartService cartService;
    @PostMapping()
    public ResponseEntity<BaseRes> putCart(@AuthenticationPrincipal String email, @RequestBody CartReqDto cartsReqDto) {
        CartDto cartsDto = cartsReqDto.toDto();
        cartService.putCart(email, cartsDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 담기 성공!"));
    }

    @PostMapping("/test")
    public ResponseEntity<BaseRes> putCartTest(@AuthenticationPrincipal String email, @RequestBody CartReqDto cartsReqDto) {
        CartDto cartsDto = cartsReqDto.toDto();
        cartService.putCart(email, cartsDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 담기 성공!"));
    }

    @DeleteMapping()
    public ResponseEntity<BaseRes> deleteCart(@AuthenticationPrincipal String email, @RequestBody CartUidReqDto cartUidReqDto) {

        int cartsUid = cartUidReqDto.getCarts_uid();
        cartService.deleteCart(email,cartsUid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 삭제 성공!"));
    }

    @GetMapping()
    public ResponseEntity<BaseRes> getCart(@AuthenticationPrincipal String email) {
        List<CartResDto> cartDtoList  =cartService.getCart(email);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 조회 성공!",cartDtoList));
    }
}
