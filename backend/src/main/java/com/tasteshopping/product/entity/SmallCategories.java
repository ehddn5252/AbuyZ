package com.tasteshopping.product.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SmallCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="small_category_name",nullable = false, columnDefinition = "varchar(30) default 'basic'")
    String smallCategoryName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="big_categories_uid")
    private BigCategories bigCategory;

}
