package com.tasteshopping.dashboard.dto;

import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SummaryDto {
    Date date;
    int visitMainNum;
    int clickLikeNum;
    int totalPrice;
    int orderNum;
    int loginNum;
    int putCartNum;
    int registerNum;
}
