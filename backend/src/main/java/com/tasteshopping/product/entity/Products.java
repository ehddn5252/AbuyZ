package com.tasteshopping.product.entity;

import com.tasteshopping.product.dto.ProductDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.util.HashMap;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @Column(nullable = false, columnDefinition = "varchar(150) default 'base_product'")
    private String name;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer price;

    @Column(name = "description_img", columnDefinition = "varchar(500)")
    private String descriptionImg;

    @Column(columnDefinition = "varchar(200)")
    private String origin;

    @Column(columnDefinition = "varchar(40)")
    private String status;

    @Column(columnDefinition = "varchar(200)")
    private String producer;

    @Column(name = "discount_rate", nullable = false)
    @ColumnDefault("0")
    private Integer discountRate;

    @Column(name = "review_rate")
    private Float reviewRate;

    @Column(name = "delivery_fee", nullable = false)
    @ColumnDefault("0")
    private Integer deliveryFee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "small_categories_uid")
    private SmallCategories smallCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brands_uid")
    private Brands brand;

    public ProductDto toDto() {

        return ProductDto.builder()
                .name(name)
                .discountRate(discountRate)
                .deliveryFee(deliveryFee)
                .descriptionImg(descriptionImg)
                .smallCategoryName(smallCategory.getSmallCategoryName())
                .brandName(brand.getName())
                .build();
    }
//    static public ProductDto toDto(Products p) {
//
//        return ProductDto.builder()
//                .name(p.getName())
//                .brandName(p.getBrand().getName())
//                .discountRate(p.getDiscountRate())
//                .deliveryFee(p.getDeliveryFee())
//                .descriptionImg(p.getDescriptionImg())
//                .smallCategoriesName(p.getSmallCategory().getSmallCategoryName())
//                .build();
//    }


//    static public ProductDto toDto2(Products p) {
//        ProductDto pDto = new ProductDto();
//        pDto.setName(p.getName());
//        pDto.setBrandName(p.getBrand().getName());
//        pDto.setDiscountRate(p.getDiscountRate());
//        pDto.setDeliveryFee(p.getDeliveryFee());
//        pDto.setDescriptionImg(p.getDescriptionImg());
//        pDto.setSmallCategoriesName(p.getSmallCategory().getSmallCategoryName());
//        return pDto;
//    }
}
