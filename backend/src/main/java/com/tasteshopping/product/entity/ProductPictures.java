package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class ProductPictures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="img_url",columnDefinition = "varchar(100)")
    String imgUrl;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;
}
