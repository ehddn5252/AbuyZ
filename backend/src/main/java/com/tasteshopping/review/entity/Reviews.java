package com.tasteshopping.review.entity;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reviews_uid")
    private Reviews parentReview;        //구매자 리뷰 유아이디

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;             //작성날짜

    @Column(columnDefinition = "varchar(500)")
    private String content;             //작성내용

    @Column(nullable = false)
    private Float rating;               //평점

    @Column(name="img_url",columnDefinition = "varchar(100)")
    private String imgUrl;             //첨부사진

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    private Users user;          //사용자 유아이디

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="products_uid")
    private Products product;       //상품 유아이디

//    @Column(nullable = false, columnDefinition = "boolean default false")
//    private Boolean report;              //신고여부


}
