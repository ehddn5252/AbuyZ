package com.tasteshopping.review.dto;

import com.tasteshopping.review.entity.Reviews;
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
public class ReviewResDto {
    private int id; //리뷰 아이디
    private String content;
    private float rating;
    private String email; // 유저 이메일
    private Date date;
    private String imgUrl;
    private List<HashMap<String,String>> options; // 옵션
    private int likeCount; //좋아요개수
    private boolean like; //로그인한 당사자가 좋아요했는지

    //답글
    private boolean reply; //답글존재여부
    private String replyContent; //답글내용
    private Date replyDate; //답글시간

    private String nickName;

    public static ReviewResDto from(Reviews reviews, boolean like, int likeCount, boolean reply, Reviews replyReview, List<HashMap<String,String>> options){
        if(reply){
            return ReviewResDto.builder()
                    .id(reviews.getUid())
                    .email(reviews.getUser().getEmail())
                    .nickName(reviews.getUser().getNickname())
                    .email(reviews.getUser().getEmail())
                    .content(reviews.getContent())
                    .rating(reviews.getRating())
                    .date(reviews.getDate())
                    .imgUrl(reviews.getImgUrl())
                    .options(options)
                    .likeCount(likeCount)
                    .like(like)
                    .reply(reply)
                    .replyContent(replyReview.getContent())
                    .replyDate(replyReview.getDate())
                    .build();
        }else{
            return ReviewResDto.builder()
                    .id(reviews.getUid())
                    .email(reviews.getUser().getEmail())
                    .nickName(reviews.getUser().getNickname())
                    .content(reviews.getContent())
                    .rating(reviews.getRating())
                    .date(reviews.getDate())
                    .imgUrl(reviews.getImgUrl())
                    .options(options)
                    .likeCount(likeCount)
                    .like(like)
                    .reply(reply)
                    .build();
        }

    }


}
