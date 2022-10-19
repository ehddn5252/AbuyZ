package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class ProductOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;
}
