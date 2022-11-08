package com.tasteshopping.review.dto;

import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
//    최근 리뷰
// 1. product 제목, 별점, 사진,

// 2. 리뷰 내용, 리뷰쓴 사람 이름, 리뷰쓴 날짜
    private Integer uid;
    private Integer productsUid;
    private String title;
    private Float rating;
    private String repImg;
    private String reviewContent;
    private String writer;
    private Date date;
}
