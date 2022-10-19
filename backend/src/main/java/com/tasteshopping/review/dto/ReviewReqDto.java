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
    private int product_uid;

    public static Reviews toEntity(ReviewReqDto dto, Users user, Products product){
        return Reviews.builder()
                .product(product)
//                .date(date)
                .content(dto.getContent())
                .rating(dto.getRating())
                .user(user)
                .report(false)
//                .img_url()
                .build();
    }

    public static Reviews toEntityParent(ReviewReqDto dto,Users user, Products product, Reviews parent){
        return Reviews.builder()
                .product(product)
//                .date(date)
                .parentReview(parent)
                .content(dto.getContent())
                .rating(dto.getRating())
                .user(user)
                .report(false)
//                .img_url()
                .build();
    }
}
