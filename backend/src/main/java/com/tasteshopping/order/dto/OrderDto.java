package com.tasteshopping.order.dto;

import com.tasteshopping.coupon.dto.CouponResDto;
import com.tasteshopping.inventory.dto.InventoryDto;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.product.dto.ProductOptionListDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {

    Integer orderUid;
    Integer count;
    Integer price;
    InventoryDto inventoryDto;
    String status;
    OrderLists orderLists;
    CouponResDto couponResDto;
    List<ProductOptionListDto> productOptionListDtoList;
}
