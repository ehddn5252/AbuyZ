package com.tasteshopping.order.dto;

import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductOptionListDto;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
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
    private LinkedHashMap<String,LinkedHashMap<String,String>> product_option_list;

    public OrderDto toCartResDto(){
        OrderDto orderDto = new OrderDto();
        orderDto.setUid(uid);

        // product_count 설정
        orderDto.setCount(product_count);

        // price 설정
        int price = Integer.parseInt(product_dto.get("price")) * (int)product_count;
        orderDto.setPrice(price);

        // productDto 설정
        ProductDto productDto = new ProductDto();
        productDto.setName(product_dto.get("name"));
        productDto.setPrice(Integer.parseInt(product_dto.get("price")));
        productDto.setDiscountRate(Integer.parseInt(product_dto.get("discountRate")));
        productDto.setRepImg(product_dto.get("repImg"));
        productDto.setDescriptionImg(product_dto.get("descriptionImg"));
        productDto.setReviewRate(Float.parseFloat(product_dto.get("reviewRate")));
        productDto.setDeliveryFee(Integer.parseInt(product_dto.get("deliveryFee")));
        productDto.setSmallCategoryName(product_dto.get("smallCategoryName"));
        productDto.setBrandName(product_dto.get("brandName"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime dateTime = LocalDateTime.parse(product_dto.get("date"),formatter);
        productDto.setDate(dateTime);
        productDto.setReviewNum(Integer.parseInt(product_dto.get("reviewNum")));

        // List<productOptionListDto> 설정
        List<ProductOptionListDto> productOptionListDtos = new ArrayList<>();

        for(String key:product_option_list.keySet()){
            ProductOptionListDto productOptionListDto = new ProductOptionListDto();
            HashMap<String,String> productOptionLists=product_option_list.get(key);
            for(String key1:productOptionLists.keySet()){
                productOptionListDto.setUid(Integer.parseInt(productOptionLists.get("uid")));
                productOptionListDto.setName(productOptionLists.get("name"));
                productOptionListDto.setValue(productOptionLists.get("value"));
                productOptionListDto.setOptionPrice(Integer.parseInt(productOptionLists.get("optionPrice")));
                productOptionListDto.setProductOptionsUid(Integer.parseInt(productOptionLists.get("productOptionsUid")));
            }
            productOptionListDtos.add(productOptionListDto);
        }
        orderDto.setProductOptionListDtoList(productOptionListDtos);
        return orderDto;
    }
}
