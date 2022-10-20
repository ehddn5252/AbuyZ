package com.tasteshopping.product.entity;

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

    @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="products_uid")
    Products product;

    @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="inventories_uid")
    Inventories inventories;

    @OneToMany(mappedBy = "productOptions",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ProductOptionLists> productOptionLists;
}
