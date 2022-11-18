package com.tasteshopping.review.dto;

import lombok.*;


import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
//    최근 리뷰
// 1. product 제목, 별점, 사진,

// 2. 리뷰 내용, 리뷰쓴 사람 이름, 리뷰쓴 날짜
    private Integer uid;
    private Integer productsUid;
    private String title;
    private Float rating;
    private String repImg;
    private String reviewContent;
    private String writer;
    private Date date;
    private String productName;
}
