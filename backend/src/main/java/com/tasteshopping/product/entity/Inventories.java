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
public class Inventories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    Integer price;
    Integer count;

    @Column(name = "product_option_list")
    String productOptionList;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "products_uid")
    Products product;

    // 양방향 설정해주기
    @OneToMany(mappedBy = "inventory",fetch = FetchType.LAZY)
    List<Carts> cartsList;

    @OneToMany(mappedBy = "inventory",fetch = FetchType.LAZY)
    List<Orders> ordersList;
}
