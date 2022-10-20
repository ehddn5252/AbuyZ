package com.tasteshopping.wish.entity;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.wish.dto.WishProductDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishLists {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer uid;

    @Column
    private Integer type;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "uid")
    private Users user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "uid")
    private Products products;

    public WishProductDto toWishProductDto(){
        int price = (int)(this.products.getPrice()*((100-this.products.getDiscountRate())/100f));
        return WishProductDto.builder()
                .product_name(this.products.getName())
                .product_uid(this.products.getUid())
                .img_url(this.products.getRepImg())
                .price(price)
                .build();
    }
}
