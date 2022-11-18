package com.tasteshopping.order.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CanWriteReviewDto {
    String title;
    String optionName;
    String repImg;
    Date orderDate;
}
