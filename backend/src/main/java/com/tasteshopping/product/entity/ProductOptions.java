package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class ProductOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer uid;

    @Column(columnDefinition = "varchar(50)")
    String name;

    @Column(columnDefinition = "varchar(100)")
    String description;

    @Column(name="option_price")
    Integer optionPrice;
}
