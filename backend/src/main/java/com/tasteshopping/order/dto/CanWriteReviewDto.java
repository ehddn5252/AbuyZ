package com.tasteshopping.order.dto;

import lombok.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CanWriteReviewDto {
    String title;
    HashMap<String, List> productOptionListMap;
    String repImg;
    Date orderDate;
}
