package com.tasteshopping.review.controller;


import com.tasteshopping.common.dto.BaseRes;
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
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping()
    public ResponseEntity<BaseRes> myReviewList(){
        List<Products> list = new ArrayList<>(); // dto로 변경해야함
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @PostMapping("")
    public ResponseEntity<BaseRes> reviewWrite(@AuthenticationPrincipal String email, @RequestBody ReviewReqDto dto){
        //파일서버에업로드후 img_url데려오기
//         @RequestParam("file") MultipartFile file
        return new ResponseEntity<>(reviewService.reviewWrite(email, dto), HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<BaseRes> reviewDelete(){
        //답글과 도움이돼요 같이 삭제
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @PostMapping("/like")
    public ResponseEntity<BaseRes> reviewLike(){
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @DeleteMapping("/like")
    public ResponseEntity<BaseRes> reviewLikeDelete(){
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @PostMapping("/reply")
    public ResponseEntity<BaseRes> reviewReply(){
        // 관리자만
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @DeleteMapping("/reply")
    public ResponseEntity<BaseRes> reviewReplyDelete(){
        // 관리자만
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<BaseRes> productReviewList(@PathVariable int product_id){
        List<ReviewResDto> list = new ArrayList<>(); // dto로 변경해야함
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @GetMapping("/report/{review_id}")
    public ResponseEntity<BaseRes> reviewReport(@PathVariable int review_id){
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

}
