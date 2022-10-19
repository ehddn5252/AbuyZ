package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class BigCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="category_name",nullable = false, columnDefinition = "varchar(30) default 'basic'")
    String categoryName;
}
