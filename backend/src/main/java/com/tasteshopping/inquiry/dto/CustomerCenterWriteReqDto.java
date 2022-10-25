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
    Integer category_uid;
    String img_url;
    String status;

}
