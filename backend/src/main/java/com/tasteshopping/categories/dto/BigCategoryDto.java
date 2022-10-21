package com.tasteshopping.categories.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BigCategoryDto {

    Integer uid;
    String categoryName;

}
