package com.tasteshopping.product.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(nullable = false, columnDefinition = "varchar(150) default 'base_product'")
    String name;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer price;

    @Column(name="description_img", columnDefinition = "varchar(500)")
    String descriptionImg;

    @Column(columnDefinition = "varchar(200)")
    String origin;

    @Column(columnDefinition = "varchar(40)")
    String status;

    @Column(columnDefinition = "varchar(200)")
    String producer;

    @Column(name="discount_rate",nullable = false)
    @ColumnDefault("0")
    Float discountRate;

    @Column(name="review_rate")
    Float reviewRate;

    @Column(name="delivery_fee",nullable = false)
    @ColumnDefault("0")
    Integer deliveryFee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="small_categories_uid")
    SmallCategories smallCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="brands_uid")
    Brands brand;



}
