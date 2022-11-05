package com.tasteshopping.cart.entity;

import com.tasteshopping.inventory.entity.Inventories;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="inventories_uid")
    Inventories inventory;


    public void modifyInfo(int productCount, Users user, Inventories inventory){
        this.productCount = productCount;
        this.user = user;
        this.inventory=inventory;
    }

}
