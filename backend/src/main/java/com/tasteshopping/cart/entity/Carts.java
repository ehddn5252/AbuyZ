package com.tasteshopping.cart.entity;

import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Carts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer productCount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="product_options_uid")
    ProductOptions productOption;


    public void modifyInfo(int productCount, Users user, Products product, ProductOptions productOptions){
        this.productCount = productCount;
        this.user = user;
        this.product = product;
        this.productOption = productOptions;
    }

}
