package com.tasteshopping.review.entity;

import com.tasteshopping.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

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

    // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인)
    @Column(nullable = false)
    @ColumnDefault("0")
    private Float status;

    // 신고 사유 ( 0:허위사실유포, 1:욕설)
    @Column(nullable = false)
    private Float reason;

    // 신고 날짜
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportDate;

    // 처리 날짜
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date processDate;
}
