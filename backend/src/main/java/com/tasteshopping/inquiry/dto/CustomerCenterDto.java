package com.tasteshopping.inquiry.dto;

import com.tasteshopping.inquiry.entity.CustomerCenterCategories;
import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.user.entity.Users;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
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
    private Integer customerCenterCategoriesUid;
    private Users user;

    // 부모 정의
    private CustomerCenters parent;

    // 자식 정의
    private CustomerCenters children;

}
