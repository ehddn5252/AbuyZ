package com.tasteshopping.order.entity;

import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.coupon.entity.Coupons;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
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
    @JoinColumn(name="products_uid")
    Products product;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="order_lists_uid")
    OrderLists orderList;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="process_statuses_uid")
    ProcessStatuses processStatus;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="coupones_uid")
    Coupons coupon;


    public OrderDto toDto(){
        return null;
    }

}
