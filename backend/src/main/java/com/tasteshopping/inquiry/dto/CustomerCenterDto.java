package com.tasteshopping.inquiry.dto;

import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.user.entity.Users;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerCenterDto {
    Integer uid;

    private String title;

    private String content;

    private String status;
    private Date date;
    private String imgUrl;
    private String customerCenterCategory;
    private Users user;

    // 부모 정의
    private CustomerCenters parent;

    // 자식 정의
    private CustomerCenters children;

}
