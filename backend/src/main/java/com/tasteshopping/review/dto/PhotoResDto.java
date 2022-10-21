package com.tasteshopping.review.dto;

import com.tasteshopping.review.entity.Reviews;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PhotoResDto {
    private int id; //리뷰 아이디
    private String imgUrl;


    public static PhotoResDto from(Reviews reviews){
        if (reviews == null) return null;
            return PhotoResDto.builder()
                    .id(reviews.getUid())
                    .imgUrl(reviews.getImgUrl())
                    .build();
    }
}
