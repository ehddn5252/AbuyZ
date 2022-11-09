package com.tasteshopping.statistics.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DateDto {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date start_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date end_date;
}
