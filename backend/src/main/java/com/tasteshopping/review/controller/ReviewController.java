package com.tasteshopping.review.controller;


import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.ReplyReqDto;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.dto.ReviewUIdDto;
import com.tasteshopping.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<BaseRes> reviewDelete(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto){
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewDelete(email, review_uid), HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<BaseRes> reviewLike(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto){
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewLike(email, review_uid), HttpStatus.OK);
    }

    @DeleteMapping("/like")
    public ResponseEntity<BaseRes> reviewLikeDelete(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto){
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewLikeDelete(email, review_uid), HttpStatus.OK);
    }

    @PostMapping("/reply")
    public ResponseEntity<BaseRes> reviewReply(@AuthenticationPrincipal String email, @RequestBody ReplyReqDto dto){
        return new ResponseEntity<>(reviewService.reviewReply(email, dto), HttpStatus.OK);
    }

    @DeleteMapping("/reply")
    public ResponseEntity<BaseRes> reviewReplyDelete(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto){
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewReplyDelete(email, review_uid), HttpStatus.OK);
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<BaseRes> productReviewList(@PathVariable int product_id){
        List<ReviewResDto> list = new ArrayList<>(); // dto로 변경해야함
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "test 성공!"));
    }

    @PostMapping("/report")
    public ResponseEntity<BaseRes> reviewReport(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto){
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewReport(email, review_uid), HttpStatus.OK);
    }

}
