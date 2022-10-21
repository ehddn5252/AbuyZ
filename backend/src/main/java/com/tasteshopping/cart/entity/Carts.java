package com.tasteshopping.cart.entity;

import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
public class Carts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer productCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_options_uid")
    ProductOptions productOption;


}
