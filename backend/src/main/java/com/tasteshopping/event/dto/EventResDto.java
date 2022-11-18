package com.tasteshopping.event.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventResDto {
    private int uid;
    private String name;
    private String start_date;
    private String end_date;
    private String thumbnail;
    private String status;
}
