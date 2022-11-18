package com.tasteshopping.event.dto;

import com.tasteshopping.coupon.dto.CouponResDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class EventResDetailDto {
    private int uid;
    private String name;
    private String start_date;
    private String end_date;
    private String thumbnail;
    private String contentImg;
    private String status;
    private String content;
    private List<CouponResDto> coupon_lists;
}
