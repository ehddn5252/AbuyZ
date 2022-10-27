package com.tasteshopping.inquiry.dto;

import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.user.entity.Users;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerCenterDetailResDto {
    Integer uid;

    private String title;

    private String content;

    private String status;
    private String imgUrl;
    private Timestamp date;
    private String customerCenterCategoryName;

    // 부모 정의
    private CustomerCenters parent;

    // 자식 정의
    private CustomerCenters children;

}
