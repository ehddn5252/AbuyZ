package com.tasteshopping.review.entity;

import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.dto.ReviewDto;
import com.tasteshopping.review.dto.ReviewSearchDto;
import com.tasteshopping.user.entity.Users;

import javax.persistence.*;
import java.util.Date;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviews_uid")
    private Reviews parentReview;        //구매자 리뷰 유아이디

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;             //작성날짜

    @Column(columnDefinition = "varchar(500)", nullable = false)
    private String content;             //작성내용

    @Column(nullable = false)
    private Float rating;               //평점

    @Column(name = "img_url", columnDefinition = "varchar(3000)")
    private String imgUrl;             //첨부사진

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_uid")
    private Users user;          //사용자 유아이디

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "products_uid")
    private Products product;       //상품 유아이디

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_uid")
    private Orders order;           //주문결제 유아이디

//    @Column(nullable = false, columnDefinition = "boolean default false")
//    private Boolean report;              //신고여부


    public ReviewDto toDto() {
        return ReviewDto.builder()
                .uid(uid)
                .productsUid(product.getUid())
                .reviewContent(content)
                .writer(user.getName())
                .rating(rating)
                .title(content)
                .repImg(product.getRepImg())
                .date(date)
                .productName(product.getName())
                .build();
    }

    public ReviewSearchDto toReviewSearchDto(){
        return ReviewSearchDto.builder()
                .uid(uid)
                .content(content)
                .createdDate(date)
                .productName(product.getName())
                .writer(user.getName())
                .rating(rating)
                .answerDate(date)
                .build();


    }
}
