package com.tasteshopping.review.dto;
import com.tasteshopping.order.entity.Orders;
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
    private int order_uid;

    public static Reviews toEntity(ReviewReqDto dto, Users user, Products product, String imagePath, Orders order){
        return Reviews.builder()
                .product(product)
                .content(dto.getContent())
                .rating(dto.getRating())
                .user(user)
                .imgUrl(imagePath)
                .order(order)
                .build();
    }
}
