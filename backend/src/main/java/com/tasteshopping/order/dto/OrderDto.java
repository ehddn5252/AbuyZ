package com.tasteshopping.order.dto;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.ProcessStatuses;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.dto.ProductOptionListDto;
import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
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
