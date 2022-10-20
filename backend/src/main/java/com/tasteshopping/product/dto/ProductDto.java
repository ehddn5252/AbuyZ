package com.tasteshopping.product.dto;

import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.entity.SmallCategories;
import com.tasteshopping.user.dto.LoginType;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private String name;
    private Integer price;
    private Integer discountRate;
    private String descriptionImg;
//    private String producer;
    private Float reviewRate;

    //
    private Integer uid;

//    private String origin;

//    private String status;

    private Integer deliveryFee;

    private String smallCategoryName;

    private String brandName;


}
