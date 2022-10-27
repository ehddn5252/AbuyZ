package com.tasteshopping.product.entity;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.order.entity.Orders;
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

    Integer count;

    Integer price;

    @OneToMany(mappedBy = "productOptions",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ProductOptionLists> productOptionLists;


    @OneToMany(mappedBy = "productOption",fetch= FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Carts> cartsList;

    @OneToMany(mappedBy = "productOptions",fetch = FetchType.LAZY)
    private List<Orders> productOrderList;


    @Column(columnDefinition = "tinyint(1) default 1")
    Boolean isDefaultOption;
}