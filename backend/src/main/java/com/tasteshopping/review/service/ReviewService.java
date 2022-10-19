package com.tasteshopping.review.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.entity.Reviews;

import java.util.List;

public interface ReviewService {
    BaseRes myReviewList();
    BaseRes reviewWrite(String email, ReviewReqDto dto);
    BaseRes reviewDelete(String email, int review_uid);
    BaseRes reviewLike(String email, int review_uid);
    BaseRes reviewLikeDelete(String email, int review_uid);
    BaseRes reviewReply();
    BaseRes reviewReplyDelete();
    BaseRes productReviewList();
    BaseRes reviewReport();
}
