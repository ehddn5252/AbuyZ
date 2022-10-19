package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class Brands {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="name",nullable = false, columnDefinition = "varchar(60) default 'basic'")
    String name;

    @Column(name="img_url", columnDefinition = "varchar(100)")
    String imgUrl;


}
