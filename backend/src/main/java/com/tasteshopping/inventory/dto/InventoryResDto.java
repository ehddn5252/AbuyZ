package com.tasteshopping.inventory.dto;

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
    List<HashMap<String,String>> productOptions;

}
