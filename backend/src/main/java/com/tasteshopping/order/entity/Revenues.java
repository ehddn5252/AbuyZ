package com.tasteshopping.order.entity;

import com.tasteshopping.user.entity.Users;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.sql.Timestamp;

@Entity
@Getter
public class Revenues {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    Date date;

    @Column(name="daily_revenue",nullable = false)
    @ColumnDefault("0")
    Integer dailyRevenue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="orders_uid")
    Orders order;

}
