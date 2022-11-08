package com.tasteshopping.inquiry.dto;

import com.tasteshopping.user.entity.Users;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomerCenterDto {
    Integer uid;

    private String title;

    private String content;

    private String status;
    private Date start_date;
    private Date end_date;
    private String imgUrl;
    private String customerCenterCategory;
    private String userName;
    private String reply;

}
