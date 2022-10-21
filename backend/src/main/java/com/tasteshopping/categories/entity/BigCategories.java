package com.tasteshopping.categories.entity;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.dto.SmallCategoryDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BigCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="category_name",nullable = false, columnDefinition = "varchar(30) default 'basic'")
    String categoryName;

    @OneToMany(mappedBy = "bigCategory",fetch = FetchType.LAZY)
    private List<SmallCategories> smallCategoriesList;

    static public BigCategoryDto toDto(BigCategories b){
        return BigCategoryDto.builder().categoryName(b.categoryName).uid(b.uid).build();
    }
}
