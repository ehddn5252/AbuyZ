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
public class InventoryResDto {

    Integer uid;
    Integer price;
    Integer count;
    String productOptionUidString;
    ProductDto productDto;
    List<HashMap<String,String>> productOptions;

}
