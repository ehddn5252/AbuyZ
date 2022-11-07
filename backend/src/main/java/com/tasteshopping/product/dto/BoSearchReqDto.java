package com.tasteshopping.product.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoSearchReqDto {

    private String name;
    private String brand_name;
    private String keyword;
    private String status;
    private Integer big_categories_uid;
    private Integer small_categories_uid;
    private Date start_date;
    private Date end_date;
}
