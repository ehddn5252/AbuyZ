package com.tasteshopping.review.controller;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.ReplyReqDto;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.dto.ReviewUIdDto;
import com.tasteshopping.review.service.AwsS3Service;
import com.tasteshopping.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final AwsS3Service awsS3Service;

    @GetMapping("/{page}")
    public ResponseEntity<BaseRes> myReviewList(@AuthenticationPrincipal String email, @PathVariable int page) {
        return new ResponseEntity<>(reviewService.myReviewList(email, page-1), HttpStatus.OK);
    }



//    @ExceptionHandler({MaxUploadSizeExceededException.class, SizeLimitExceededException.class})
//    public BaseRes exception(Exception e){
//        System.out.println("----------------exception호출-----------------");
//        e.printStackTrace();
//        return new BaseRes(202,"파일 용량 크기 제한", null);
//    }

    @PostMapping("")
    public ResponseEntity<BaseRes> reviewWrite(@AuthenticationPrincipal String email,
                                               @RequestPart ReviewReqDto dto,
                                               @RequestPart(name = "file",required = false) MultipartFile multipartFile) {
        String imagePath = null; //파일서버에업로드후 img_url 데려오기
        BaseRes res = null;
        try {
            imagePath = awsS3Service.uploadImgFile(multipartFile);
            res = reviewService.reviewWrite(email, dto, imagePath);
        } catch (IOException e) {
            e.printStackTrace();
//            res = exception(e);
            res = new BaseRes(202,"파일 업로드 에러", null);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<BaseRes> reviewDelete(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto) {
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewDelete(email, review_uid), HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<BaseRes> reviewLike(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto) {
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewLike(email, review_uid), HttpStatus.OK);
    }

    @DeleteMapping("/like")
    public ResponseEntity<BaseRes> reviewLikeDelete(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto) {
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewLikeDelete(email, review_uid), HttpStatus.OK);
    }

    @PostMapping("/reply")
    public ResponseEntity<BaseRes> reviewReply(@AuthenticationPrincipal String email, @RequestBody ReplyReqDto dto) {
        return new ResponseEntity<>(reviewService.reviewReply(email, dto), HttpStatus.OK);
    }

    @DeleteMapping("/reply")
    public ResponseEntity<BaseRes> reviewReplyDelete(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto) {
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewReplyDelete(email, review_uid), HttpStatus.OK);
    }

    @GetMapping("/{product_id}/{page}")
    public ResponseEntity<BaseRes> productReviewList(@AuthenticationPrincipal String email, @PathVariable int product_id, @PathVariable int page) {
        return new ResponseEntity<>(reviewService.productReviewList(email, product_id, page-1), HttpStatus.OK);
    }

    @PostMapping("/report")
    public ResponseEntity<BaseRes> reviewReport(@AuthenticationPrincipal String email, @RequestBody ReviewUIdDto dto) {
        int review_uid = dto.getReview_uid();
        return new ResponseEntity<>(reviewService.reviewReport(email, review_uid), HttpStatus.OK);
    }

    @GetMapping("/photo/{product_id}")
    public ResponseEntity<BaseRes> productPhotoReview(@PathVariable int product_id) {
        return new ResponseEntity<>(reviewService.productPhotoReview(product_id), HttpStatus.OK);
    }

    @GetMapping("/photos/{product_id}")
    public ResponseEntity<BaseRes> productPhotosReview(@PathVariable int product_id) {
        return new ResponseEntity<>(reviewService.productPhotosReview(product_id), HttpStatus.OK);
    }

    @GetMapping("/detail/{review_id}")
    public ResponseEntity<BaseRes> productReviewDetail(@AuthenticationPrincipal String email, @PathVariable int review_id) {
        return new ResponseEntity<>(reviewService.productReviewDetail(email, review_id), HttpStatus.OK);
    }
}
