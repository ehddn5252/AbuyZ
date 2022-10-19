package com.tasteshopping.product.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private String name;
    private String price;
    private String big_category_name;
    private String small_category_name;
    private String description_img;
    private String origin;
    private String brand_name;
    private String producer;
    private Float discount_rate;
    private Float review_rate;

//    public Users toEntity(LoginType loginType){
//
//        return Users.builder()
//                .email(this.email)
//                .password(this.password)
//                .address(this.address)
//                .detailAddress(this.detailAddress)
//                .name(this.name)
//                .nickname(this.nickname)
//                .phoneNumber(this.phoneNumber)
//                .gender(this.gender)
//                .birth(this.birth)
//                .mileage(this.mileage)
//                .status(this.status)
//                .loginType(loginType)
//                .userRoles(Role.USER)
//                .build();
//
//    }
}
