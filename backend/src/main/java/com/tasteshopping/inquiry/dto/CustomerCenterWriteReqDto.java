package com.tasteshopping.inquiry.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCenterWriteReqDto {

    String title;
    String content;
    String customer_center_category;
    String img_url;
    String status;

}
