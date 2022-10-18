package com.tasteshopping.order.entity;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.coupon.entity.Coupons;
import javax.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer uid;

    @Column(nullable = false, columnDefinition = "default 0")
    Integer count;

    @Column(nullable = false, columnDefinition = "default 0")
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



}
