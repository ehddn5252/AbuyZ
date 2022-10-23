package com.tasteshopping.product.entity;

import com.tasteshopping.cart.entity.Carts;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;

    @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="inventories_uid")
    Inventories inventories;

    @OneToMany(mappedBy = "productOptions",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ProductOptionLists> productOptionLists;


    @OneToMany(mappedBy = "productOption",fetch= FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Carts> cartsList;


    @Column(columnDefinition = "tinyint(1) default 1")
    Boolean isDefaultOption;
}