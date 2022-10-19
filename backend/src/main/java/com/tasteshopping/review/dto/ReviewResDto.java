package com.tasteshopping.review.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResDto {
    private String content;
    private float rating;
    // 유저 이름? 이메일?
    private Timestamp date;
    private String img_url;
    // 신고여부?

    // 답글관련 -> 같이 묶어서 보내주는게 맞나?
}
