package com.tasteshopping.order.dto;

import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.product.dto.ProductOptionListDto;
import lombok.*;
import org.hibernate.mapping.Array;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderReqDtoTest {

    private Integer uid;
    private LinkedHashMap<String,String> productDto;
    private Integer productCount;
    private LinkedHashMap<String,LinkedHashMap> productOptionListDto;

    public CartResDto toCartResDto(){
        CartResDto cartResDto = new CartResDto();
//        cartResDto.setProductDto(product_dto);
        cartResDto.setProductCount(productCount);
        List<ProductOptionListDto> l = new ArrayList<>();
//        for(int i=0;i<product_option_list_dto.size();++i){
//            l.add((ProductOptionListDto)product_option_list_dto.get(i));
//        }
//        cartResDto.setProductOptionListDto(l);
        return cartResDto;
    }
}
