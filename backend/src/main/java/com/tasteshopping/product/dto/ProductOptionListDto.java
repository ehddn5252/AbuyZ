package com.tasteshopping.product.dto;

import com.tasteshopping.product.entity.ProductOptions;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductOptionListDto {
    private Integer uid;
    private String name;
    private String value;
    private Integer optionPrice;
    private Integer productOptionsUid;
}
