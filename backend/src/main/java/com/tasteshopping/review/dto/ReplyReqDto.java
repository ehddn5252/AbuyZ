package com.tasteshopping.review.dto;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReplyReqDto {
    private String content;
    private int review_uid;

    public static Reviews toEntity(ReplyReqDto dto, Users user, Products product, Reviews parent){
        return Reviews.builder()
                .parentReview(parent)
                .product(product)
                .content(dto.getContent())
                .rating(0.0f)
                .user(user)
                .build();
    }
}
