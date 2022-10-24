package com.tasteshopping.event.entity;

import com.tasteshopping.event.dto.EventDto;
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
    public EventDto toDto(){
        return null;
    }
}
