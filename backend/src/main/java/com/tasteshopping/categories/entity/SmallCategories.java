package com.tasteshopping.categories.entity;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.product.entity.Products;
import lombok.*;

import javax.persistence.*;
import java.util.List;

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

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="products_uid")
    private List<Products> products;

    static public SmallCategoryDto toDto(SmallCategories b){
        return SmallCategoryDto.builder().categoryName(b.getSmallCategoryName()).uid(b.getUid()).build();
    }
}
