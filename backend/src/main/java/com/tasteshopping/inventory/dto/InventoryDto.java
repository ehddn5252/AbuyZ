package com.tasteshopping.inventory.dto;

import com.tasteshopping.product.dto.ProductDto;
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
    Integer productsUid;
    ProductDto productDto;
    Integer count;
    String productOptionUidString;
    String[] productOptions;
    String repImg;
}
