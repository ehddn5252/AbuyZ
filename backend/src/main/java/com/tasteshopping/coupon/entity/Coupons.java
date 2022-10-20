package com.tasteshopping.coupon.entity;

import com.tasteshopping.product.entity.BigCategories;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Coupons {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer uid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int discountPrice;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "bigCategoriesUid")
    private BigCategories bigCategories;
}
