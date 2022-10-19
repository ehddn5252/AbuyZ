package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class ProductPictures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="img_url",columnDefinition = "varchar(500)")
    String imgUrl;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;
}
