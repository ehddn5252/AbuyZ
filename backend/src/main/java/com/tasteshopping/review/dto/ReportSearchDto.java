package com.tasteshopping.review.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReportSearchDto {
    //해결유무 ( 0:대기, 1:거절, 2:승인 )
    private String status;
    //신고사유 ( 0:허위사실유포, 1:욕설 )
    private String reason;
    //상품명
    private String productName;
    //리뷰내용
    private String content;
    //신고일시
    private Date reportDate;
    //처리일시
    private Date processDate;
    //작성자 : 닉네임? 이메일 앞부분?
    private String writer;
}
