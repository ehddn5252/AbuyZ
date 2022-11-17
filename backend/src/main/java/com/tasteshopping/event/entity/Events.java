package com.tasteshopping.event.entity;

import com.tasteshopping.coupon.dto.CouponResDto;
import com.tasteshopping.event.dto.EventResDetailDto;
import com.tasteshopping.event.dto.EventStatus;
import com.tasteshopping.event.dto.EventReqDto;
import com.tasteshopping.event.dto.EventResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
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

    @Column
    private String content;

    @OneToMany(mappedBy = "events", cascade = CascadeType.ALL)
    private List<EventCouponLists> eventCouponLists = new ArrayList<>();

    public void update(EventReqDto eventDto){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            if(eventDto.getThumbnail()!=null)this.thumbnail = eventDto.getThumbnail();
            if(eventDto.getContentImg()!=null)this.contentImgUrl = eventDto.getContentImg();
            this.content = eventDto.getContent();
            this.endDate = formatter.parse(eventDto.getEnd_date());
            this.startDate = formatter.parse(eventDto.getStart_date());
            this.status = eventDto.getStatus();
            this.name = eventDto.getName();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    public EventResDetailDto toEventResDetailDto(){
        List<CouponResDto> coupon_lists = new ArrayList<>();
        for(EventCouponLists eventCoupon: this.getEventCouponLists()){
            coupon_lists.add(eventCoupon.getCoupons().toDto());
        }
        String status = "";
        switch (this.status){
            case 0:
                status = EventStatus.진행예정.toString();
                break;
            case 1:
                status = EventStatus.진행중.toString();
                break;
            case 2:
                status = EventStatus.종료.toString();
                break;
        }
        return EventResDetailDto.builder()
                .uid(this.uid)
                .name(this.name)
                .start_date(this.startDate.toString())
                .end_date(this.endDate.toString())
                .thumbnail(this.thumbnail)
                .contentImg(this.contentImgUrl)
                .status(status)
                .content(this.content)
                .coupon_lists(coupon_lists)
                .build();
    }
    public EventResDto toDto(){
        String status = "";
        switch (this.status){
            case 0:
                status = EventStatus.진행예정.toString();
                break;
            case 1:
                status = EventStatus.진행중.toString();
                break;
            case 2:
                status = EventStatus.종료.toString();
                break;
        }
        return EventResDto.builder()
                .uid(this.uid)
                .name(this.name)
                .start_date(this.startDate.toString())
                .end_date(this.endDate.toString())
                .thumbnail(this.thumbnail)
                .status(status)
                .build();
    }
    public void updateStatus(int status){
        this.status = status;
    }
}
