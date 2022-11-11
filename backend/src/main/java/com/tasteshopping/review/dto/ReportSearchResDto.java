package com.tasteshopping.review.dto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReportSearchResDto {
    /*
    해결 유무, 신고 사유, 제품명, 리뷰내용, 신고일시, 처리일시, 작성자
     */
    private String status;     // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인, 3:전체)
    private String reason;     // 신고 사유 ( 0:허위사실유포, 1:욕설)
    private String productName;
    private String reviewName;
    Date reportDate;
    Date processDate;
    private String writer;


}
