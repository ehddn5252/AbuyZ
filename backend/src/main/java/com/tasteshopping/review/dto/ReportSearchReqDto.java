package com.tasteshopping.review.dto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReportSearchReqDto {
    /*
    신고 사유 카테고리로 구분
    제품명
    기간
    승인 유무(전체, 대기, 거절, 승인)
     */
    private int reasonId;     // 신고 사유 ( 0:허위사실유포, 1:욕설)
    private String productName;
    private int status;     // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인, 3:전체)
    Date startDate;
    Date endDate;


}
