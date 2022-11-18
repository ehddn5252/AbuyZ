package com.tasteshopping.wish.controller;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.wish.service.WishServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/wish")
@RequiredArgsConstructor
public class WishController {
    private final WishServiceImpl wishService;
    @GetMapping("/list")
    public ResponseEntity<ResponseDto> getWishLists(@AuthenticationPrincipal String email,Pageable pageable){
        return new ResponseEntity<>(wishService.getWishList(email, pageable), HttpStatus.OK);
    }
    @GetMapping("/{product_uid}")
    public ResponseEntity<ResponseDto> add(@AuthenticationPrincipal String email,
                                           @PathVariable String product_uid){
        return new ResponseEntity<>(wishService.wish(email,product_uid),HttpStatus.OK);
    }
    @DeleteMapping("/{wish_uid}")
    public ResponseEntity<ResponseDto>cancel(@AuthenticationPrincipal String email,
                                             @PathVariable int wish_uid){
        return new ResponseEntity<>(wishService.cancel(email,wish_uid),HttpStatus.OK);
    }
}