package com.tasteshopping.review.dto;

import lombok.*;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewSearchReqDto {

    //big 카테고리, small category, 제품명 리뷰 내용, 기간, 답변 유무

    Integer bigCategoryUid; // 큰 카테고리
    Integer smallCategoryUid; // 작은 카테고리
    String productName; // 상품 이름
    String content; // 리뷰 내용
    Date startDate; //검색 시작 날짜
    Date endDate;   // 검색 끝 날짜
    Integer isAnswered; // 0이면 전체 1이면. 답글 있는 것, 2면 답글 없는 것. 필수값
}
