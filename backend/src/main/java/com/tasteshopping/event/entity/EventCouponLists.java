package com.tasteshopping.event.entity;

import com.tasteshopping.coupon.entity.Coupons;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventCouponLists {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int uid;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "couponsUid")
    private Coupons coupons;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "eventUid")
    private Events events;
}
