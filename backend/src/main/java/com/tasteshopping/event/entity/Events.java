package com.tasteshopping.event.entity;

import com.tasteshopping.coupon.dto.CouponResDto;
import com.tasteshopping.event.dto.EventResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Events {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int uid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @Column
    private String thumbnail;

    @Column
    private String contentImgUrl;

    @Column
    private int status;

    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "events", cascade = CascadeType.ALL)
    private List<EventCouponLists> eventCouponLists = new ArrayList<>();
    public EventResDto toDto(){
        List<CouponResDto> coupon_lists = new ArrayList<>();
        for(EventCouponLists eventCoupon: this.getEventCouponLists()){
            coupon_lists.add(eventCoupon.getCoupons().toDto());
        }

        return EventResDto.builder()
                .name(this.name)
                .start_date(this.startDate.toString())
                .end_date(this.endDate.toString())
                .thumbnail(this.thumbnail)
                .contentImg(this.contentImgUrl)
                .status(this.status)
                .content(this.content)
                .coupon_lists(coupon_lists)
                .build();
    }
}
