package com.tasteshopping.wish.controller;

import com.sun.org.apache.regexp.internal.RE;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.wish.service.WishServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/wish")
@RequiredArgsConstructor
public class WishController {
    private final WishServiceImpl wishService;
    @GetMapping("/list")
    public ResponseEntity<ResponseDto> getWishLists(@AuthenticationPrincipal String email){
        return new ResponseEntity<>(wishService.getWishList(email), HttpStatus.OK);
    }
    @GetMapping("/{product_uid}")
    public ResponseEntity<ResponseDto> add(@AuthenticationPrincipal String email,
                                           @PathVariable String product_uid){
        return new ResponseEntity<>(wishService.wish(email,product_uid),HttpStatus.OK);
    }

}
