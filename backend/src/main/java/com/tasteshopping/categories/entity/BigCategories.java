package com.tasteshopping.categories.entity;

import com.tasteshopping.categories.dto.BigCategoryDto;
import lombok.*;

import javax.persistence.*;

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


    static public BigCategoryDto toDto(BigCategories b){
        return BigCategoryDto.builder().categoryName(b.categoryName).uid(b.uid).build();
    }
}
