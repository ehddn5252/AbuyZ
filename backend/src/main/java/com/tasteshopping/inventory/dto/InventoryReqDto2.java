package com.tasteshopping.inventory.dto;

import lombok.*;

import java.util.LinkedHashMap;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InventoryReqDto2 {
    LinkedHashMap<String,LinkedHashMap<String,String>> inventory_option_list;
}
