package com.tasteshopping.review.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.*;
import com.tasteshopping.review.entity.Reviews;

import java.util.List;

public interface ReviewService {
    BaseRes reviewWrite(String email, ReviewReqDto dto, String imagePath);
    BaseRes reviewDelete(String email, int review_uid);
    BaseRes reviewLike(String email, int review_uid);
    BaseRes reviewLikeDelete(String email, int review_uid);
    BaseRes reviewReply(String email, ReplyReqDto dto);
    BaseRes reviewReplyDelete(String email, int review_uid);
    BaseRes productReviewList(String email, int product_uid, int page);
    BaseRes reviewReport(String email, ReportReqDto dto);
    BaseRes productPhotoReview(int product_uid);
    BaseRes productPhotosReview(int product_uid);
    BaseRes productReviewDetail(String email,int review_uid);
    List<ReviewSearchDto> searchByDetail(ReviewSearchReqDto reviewSearchReqDto);

    BaseRes searchReport(ReportSearchReqDto reportSearchReqDto);

    BaseRes getReportedReview(int review_uid);

    BaseRes setStatus(ReportStatusReqDto reportStatusReqDto);

    BaseRes getAllReportedReview();
}
