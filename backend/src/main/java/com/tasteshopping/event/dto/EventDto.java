package com.tasteshopping.event.dto;

import com.tasteshopping.event.entity.Events;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Builder
public class EventDto {

    private String name;
    private String start_date;
    private String end_date;
    private String thumbnail;
    private String contentImg;
    private int status;
    public Events toEntity(){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return Events.builder()
                    .name(this.name)
                    .startDate(formatter.parse(this.start_date))
                    .endDate(formatter.parse(this.end_date))
                    .thumbnail(this.thumbnail)
                    .contentImgUrl(this.contentImg)
                    .status(this.status)
                    .build();
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
