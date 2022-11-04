package com.tasteshopping.inventory.dto;

import com.tasteshopping.product.dto.ProductDto;
import lombok.*;

import java.util.HashMap;
import java.util.List;

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
    List<HashMap<String,String>> productOptions;
    String productOptionUidString;
    String[] productOptionUids;
    String repImg;
}
