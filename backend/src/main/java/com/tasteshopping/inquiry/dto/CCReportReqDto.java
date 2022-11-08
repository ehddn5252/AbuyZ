package com.tasteshopping.inquiry.dto;

import com.tasteshopping.user.entity.Users;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CCReportReqDto {
    Integer report_uid;
    Integer status; // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인)
}
