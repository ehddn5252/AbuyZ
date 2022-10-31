package com.tasteshopping.inventory.dto;

import com.tasteshopping.inventory.entity.Inventories;
import lombok.*;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryReqDto {

    Integer uid;
    Integer products_uid;
    Integer count;
    Integer price;
    String option_list;

    public Inventories toEntity(){
        Inventories inventories = new Inventories();
        inventories.setUid(uid);
        inventories.setCount(count);
        inventories.setPrice(price);
        inventories.setProductOptionList(option_list);
        return inventories;
    }
}
