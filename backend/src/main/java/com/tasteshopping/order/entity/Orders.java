package com.tasteshopping.order.entity;

import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.review.entity.Reviews;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_lists_uid")
    OrderLists orderList;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventories_uid")
    Inventories inventory;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<CustomerCenters> customerCenters;


//    @ManyToOne(fetch= FetchType.LAZY)
//    @JoinColumn(name="process_statuses_uid")
//    ProcessStatuses processStatus;

    @Column
    String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupons_uid")
    Coupons coupon;

    @OneToOne(mappedBy = "order", fetch = FetchType.LAZY)
    private Reviews review;

    public void changeStatus(String status){
        this.status=status;
    }

    public OrderDto toDto() {
        OrderDto orderDto = new OrderDto();
        orderDto.setCount(count);
        orderDto.setPrice(price);
        orderDto.setOrderUid(uid);
        orderDto.setStatus(status);
        if (coupon != null) {
            orderDto.setCouponResDto(coupon.toDto());
        }
        orderDto.setInventoryDto(inventory.toDto());
        return orderDto;
    }
}
