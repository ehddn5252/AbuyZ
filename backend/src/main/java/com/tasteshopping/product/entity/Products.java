package com.tasteshopping.product.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(nullable = false, columnDefinition = "varchar(30) default 'base_product'")
    String name;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer price;

    @Column(name="description_img", columnDefinition = "varchar(100)")
    String descriptionImg;

    @Column(columnDefinition = "varchar(30)")
    String origin;

    @Column(columnDefinition = "varchar(30)")
    String status;

    @Column(columnDefinition = "varchar(50)")
    String producer;

    @Column(name="discount_rate",nullable = false)
    @ColumnDefault("0")
    Float discountRate;

    @Column(name="review_rate")
    Float reviewRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_options")
    ProductOptions productOption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="small_categories_uid")
    SmallCategories smallCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="brands_uid")
    Brands brand;



}
