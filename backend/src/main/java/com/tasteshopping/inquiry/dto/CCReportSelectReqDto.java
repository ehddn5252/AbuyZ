package com.tasteshopping.inquiry.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CCReportSelectReqDto {
    int reason; //신고사유 0: 허위사실유포, 1: 욕설, -1: 전체
    String product_name; // 제품명
    int date_type; // 0: 신고일시, 1: 처리일시
    String start_date; // 시작일
    String end_date; // 마감일
    int status; // 0: 대기, 1: 거절, 2: 승인, -1: 전체
}
