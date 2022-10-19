package com.tasteshopping.product.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Inventories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column
    Integer count;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="product_options_uid")
    ProductOptions productOption;

}
