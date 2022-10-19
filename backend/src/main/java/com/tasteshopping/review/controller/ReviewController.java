package com.tasteshopping.review.controller;


import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping()
    public ResponseEntity<List<Products>> myReviewList(){
        List<Products> list = new ArrayList<>(); // dto로 변경해야함
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Boolean> reviewWrite(@AuthenticationPrincipal String email, @RequestBody ReviewReqDto dto, @RequestBody int product_uid, @RequestParam("file") MultipartFile file){
        //파일서버에업로드후 img_url데려오기
        return new ResponseEntity<>(reviewService.reviewWrite(email, dto, product_uid), HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Boolean> reviewDelete(){
        //답글과 도움이돼요 같이 삭제
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<Boolean> reviewLike(){
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @DeleteMapping("/like")
    public ResponseEntity<Boolean> reviewLikeDelete(){
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/reply")
    public ResponseEntity<Boolean> reviewReply(){
        // 관리자만
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @DeleteMapping("/reply")
    public ResponseEntity<Boolean> reviewReplyDelete(){
        // 관리자만
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<List<ReviewResDto>> productReviewList(@PathVariable int product_id){
        List<ReviewResDto> list = new ArrayList<>(); // dto로 변경해야함
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/report/{review_id}")
    public ResponseEntity<Boolean> reviewReport(@PathVariable int review_id){
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

}
