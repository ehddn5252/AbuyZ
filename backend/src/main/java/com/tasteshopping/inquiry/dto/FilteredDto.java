package com.tasteshopping.inquiry.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class FilteredDto {
    private int uid;
    private String status;
    private String category_name;
    private String title;
    private String content;
    private Date start_date;
    private Date end_date;
    private String writer;
    private String reply;

    @QueryProjection
    public FilteredDto(int uid,String status, String category_name, String title, String content, Date start_date,Date end_date,String writer, String reply){
        this.uid = uid;
        this.status = status;
        this.category_name = category_name;
        this.title = title;
        this.content = content;
        this.start_date = start_date;
        this.end_date = end_date;
        this.writer = writer;
        this.reply = reply;
    }
}
