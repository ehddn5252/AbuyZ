package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class ProductKeywords {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer uid;

    @Column(name="name",nullable = false, columnDefinition = "varchar(40) default 'defaultName'")
    String name;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;
}
