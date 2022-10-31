package com.tasteshopping.inventory.dto;

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
    String productOptionUidString;
    String[] productOptions;
}
