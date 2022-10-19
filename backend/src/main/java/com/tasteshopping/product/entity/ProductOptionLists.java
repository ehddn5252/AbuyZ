package com.tasteshopping.product.entity;

import javax.persistence.*;

@Entity
public class ProductOptionLists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(columnDefinition = "varchar(50)")
    String name;

    @Column(columnDefinition = "varchar(100)")
    String description;

    @Column(name="option_price")
    Integer optionPrice;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="product_options_uid")
    ProductOptions productOptions;
}
