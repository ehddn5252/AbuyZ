package com.tasteshopping.review.dto;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewReqDto {
    private String content;
    private float rating;

    public static Reviews toEntity(ReviewReqDto dto, Users user, Products product, Date date){
        return Reviews.builder()
                .product(product)
                .date(date)
                .content(dto.getContent())
                .rating(dto.getRating())
                .user(user)
//                .img_url()
                .build();
    }

    public static Reviews toEntityParent(ReviewReqDto dto,Users user, Products product, Reviews parent, Date date){
        return Reviews.builder()
                .product(product)
                .date(date)
                .parent_review(parent)
                .content(dto.getContent())
                .rating(dto.getRating())
                .user(user)
//                .img_url()
                .build();
    }
}
