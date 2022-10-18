package com.tasteshopping.inquiry.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CustomerCenterCategories {
    @Id
    Integer uid;

    @Column(name="name",nullable = false, columnDefinition = "varchar(40) default 'basic'")
    private String name;
}
