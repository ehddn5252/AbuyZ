package com.tasteshopping.dashboard.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Setter
@Getter
public class AnalysisDataDto {
    int uid;
    int visitCount;
    Date date;
    String pageName;
}
