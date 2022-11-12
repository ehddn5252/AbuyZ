package com.tasteshopping.review.entity;

import com.tasteshopping.review.dto.ReportSearchResDto;
import com.tasteshopping.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_uid")
    private Users user;          //사용자 유아이디

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviews_uid")
    private Reviews review;        //리뷰 유아이디

    // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인)
    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer status;

    // 신고 사유 ( 0:허위사실유포, 1:욕설)
    @Column(nullable = false)
    private Integer reason;

    // 신고 날짜
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportDate;

    // 처리 날짜
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date processDate;

    public void update(int status) {
        this.status = status;
    }

    public ReportSearchResDto toSearchResDto() {
        String statusName = "";
//        " 0:대기, 1:거절, 2:승인"
        if (status == 0) {
            statusName = "대기";
        } else if (status == 1) {
            statusName = "거절";
        } else if (status == 2) {
            statusName = "승인";
        }
        //( 0:허위사실유포, 1:욕설)
        String reasonName = "";
        if (reason == 0) {
            reasonName = "허위사실유포";
        } else if (reason == 1) {
            reasonName = "욕설";
        }

        return ReportSearchResDto.builder()
                .uid(uid)
                .reviewsUid(review.getUid())
                .productName(review.getProduct().getName())
                .status(statusName)
                .reason(reasonName)
                .reportDate(reportDate)
                .processDate(processDate)
                .reviewName(review.getContent())
                .writer(user.getName())
                .build();
    }
}
