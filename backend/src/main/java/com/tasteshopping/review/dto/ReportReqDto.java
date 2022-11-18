package com.tasteshopping.review.dto;
import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReportReqDto {
    private int review_uid;
    private int status;     // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인)
    private int reason;     // 신고 사유 ( 0:허위사실유포, 1:욕설)


    public static Reports toEntity(Reviews review, Users user, ReportReqDto dto){
        return Reports.builder()
                .review(review)
                .user(user)
                .reason(dto.getReason())
                .status(dto.getStatus())
                .build();
    }
}
