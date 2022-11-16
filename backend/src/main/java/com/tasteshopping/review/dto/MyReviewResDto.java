package com.tasteshopping.review.dto;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MyReviewResDto {
    private int uid;
    private float rating;
    private String productName;
    private String content;
    private Date createdDate;
    private Date answerDate;
    private String writer;
    private boolean answered;
    private String reply;

    public static MyReviewResDto from(Reviews review, Reviews reply, Users user, boolean answered) {
        Date answer_date;
        String rep;
        if (answered == false) {
            answer_date = null;
            rep = null;
        } else {
            answer_date = reply.getDate();
            rep = reply.getContent();
        }
        return MyReviewResDto.builder()
                .uid(review.getUid())
                .content(review.getContent())
                .rating(review.getRating())
                .productName(review.getProduct().getName())
                .createdDate(review.getDate())
                .answerDate(answer_date)
                .writer(user.getNickname())
                .answered(answered)
                .reply(rep)
                .build();
    }

}
