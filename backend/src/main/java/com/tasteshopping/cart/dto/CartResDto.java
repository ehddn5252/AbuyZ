package com.tasteshopping.cart.dto;

import com.tasteshopping.inventory.dto.InventoryDto;
import com.tasteshopping.inventory.dto.InventoryResDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductOptionListDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartResDto {

    private Integer uid;
    private ProductDto productDto;
    private Integer productCount;
    private List<ProductOptionListDto> productOptionListDto;
    private InventoryResDto inventoryResDto;
}
