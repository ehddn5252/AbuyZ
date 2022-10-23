package com.tasteshopping.cart.controller;

import com.tasteshopping.cart.dto.*;
import com.tasteshopping.cart.service.CartService;
import com.tasteshopping.common.dto.BaseRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<BaseRes> putCart(@RequestBody CartReqDto cartsReqDto) {
        CartDto cartsDto = cartsReqDto.toDto();
        System.out.println(cartsDto);
        cartService.putCart(cartsDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 담기 성공!"));
    }

    @DeleteMapping()
    public ResponseEntity<BaseRes> deleteCart(@RequestBody CartUidReqDto cartUidReqDto) {
        int cartsUid = cartUidReqDto.getCarts_uid();
        cartService.deleteCart(cartsUid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 삭제 성공!"));
    }


    @GetMapping("/{usersUid}")
    public ResponseEntity<BaseRes> getCart(@PathVariable int usersUid) {
        List<CartResDto> cartDtoList  =cartService.getCart(usersUid);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "장바구니 조회 성공!",cartDtoList));
    }
}
