package com.tasteshopping.order.entity;

import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.review.entity.Reviews;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer count;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer price;


    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="order_lists_uid")
    OrderLists orderList;


    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="inventories_uid")
    Inventories inventory;

//    @ManyToOne(fetch= FetchType.LAZY)
//    @JoinColumn(name="process_statuses_uid")
//    ProcessStatuses processStatus;

    String status;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="coupones_uid")
    Coupons coupon;

    @OneToOne(mappedBy = "order", fetch = FetchType.LAZY)
    @JoinColumn(name="orders_uid")
    private Reviews review;

    public OrderDto toDto() {
        OrderDto orderDto = new OrderDto();
        orderDto.setPrice(price);
        orderDto.setUid(uid);
        orderDto.setStatus(status);
//        orderDto.setCouponResDto(coupon.toDto());
        orderDto.setInventoryDto(inventory.toDto());
        return orderDto;
    }
}