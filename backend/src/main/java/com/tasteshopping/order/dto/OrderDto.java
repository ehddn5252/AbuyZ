package com.tasteshopping.order.dto;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.product.dto.ProductDto;
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

    Integer uid;
    Integer count;
    Integer price;
    //
    ProductDto productdto;
    ProcessStatusDto processStatusDto;
    CouponDto couponDto;
    List<ProductOptionListDto> productOptionListDtoList;
}
