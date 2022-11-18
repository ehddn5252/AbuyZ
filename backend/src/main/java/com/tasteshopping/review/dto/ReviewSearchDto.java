package com.tasteshopping.review.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewSearchDto {
    int uid; // reivew의 uid
    boolean isAnswered; // 답글이 있는 지 여부
    float rating;   // 평점
    String productName; // 상품 이름
    String content; // 내용 
    Date createdDate;   // 생성 날짜
    Date answerDate;    // 답변을 단 날짜
    String writer;  // 글쓴이
    String reply;  // 답변
}
