package com.tasteshopping.review.service;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.entity.Reviews;

import java.util.List;

public interface ReviewService {
    List<Products> myReviewList();
    boolean reviewWrite(String email, ReviewReqDto dto, int product_uid);
    boolean reviewDelete();
    boolean reviewLike();
    boolean reviewLikeDelete();
    boolean reviewReply();
    boolean reviewReplyDelete();
    List<ReviewResDto> productReviewList();
    boolean reviewReport();
}
