package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDto {

    Integer uid;
    Integer price;
    Integer count;
    String productOptionList;
}
