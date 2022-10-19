package com.tasteshopping.inquiry.entity;

import javax.persistence.*;

@Entity
public class CustomerCenterCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="name",nullable = false, columnDefinition = "varchar(40) default 'basic'")
    private String name;
}
