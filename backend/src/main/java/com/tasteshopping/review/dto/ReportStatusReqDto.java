package com.tasteshopping.review.dto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReportStatusReqDto {
    /*
    신고 사유 카테고리로 구분
    제품명
    기간
    승인 유무(전체, 대기, 거절, 승인)
     */
    private Integer reportsUid;
    private Integer status;
}
