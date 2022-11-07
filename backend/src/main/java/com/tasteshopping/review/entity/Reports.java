package com.tasteshopping.review.entity;

import com.tasteshopping.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    private Users user;          //사용자 유아이디

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reviews_uid")
    private Reviews review;        //리뷰 유아이디
}
