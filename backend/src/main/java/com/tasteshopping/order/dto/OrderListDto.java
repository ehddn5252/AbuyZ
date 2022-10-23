package com.tasteshopping.order.dto;

import com.tasteshopping.coupon.dto.CouponDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.Products;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderListDto {
    Integer uid;
    Date date;
    Integer totalPrice;
    String day;
    ProductDto productDto;
}
