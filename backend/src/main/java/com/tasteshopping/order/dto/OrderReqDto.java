package com.tasteshopping.order.dto;

import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductOptionListDto;
import lombok.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderReqDto {

    private Integer uid;
    private LinkedHashMap<String,String> product_dto;
    private Integer product_count;
    private LinkedHashMap<String,String> product_option_list_dto;

    public CartResDto toCartResDto(){
        CartResDto cartResDto = new CartResDto();
//        cartResDto.setProductDto(product_dto);
        cartResDto.setProductCount(product_count);
        List<ProductOptionListDto> l = new ArrayList<>();
//        for(int i=0;i<product_option_list_dto.size();++i){
//            l.add((ProductOptionListDto)product_option_list_dto.get(i));
//        }
//        cartResDto.setProductOptionListDto(l);
        return cartResDto;
    }
}
