package com.tasteshopping.product.entity;

import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.product.dto.ProductDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

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

    //    @Column(columnDefinition = "varchar(200)")
//    private String origin;
//
    @Column(name = "rep_img", columnDefinition = "varchar(3000)")
    private String repImg;

    @Column(columnDefinition = "varchar(40)")
    private String status;
//
//    @Column(columnDefinition = "varchar(200)")
//    private String producer;

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

    // 양방향 설정
    @OneToMany(mappedBy ="product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Inventories> inventories;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductKeywords> productKeywords;

    @OneToMany(mappedBy ="product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductPictures> productPictures;

    @OneToMany( mappedBy = "product",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductOptions> productOptions;


    public ProductDto toDto() {

        return ProductDto.builder()
                .name(name)
                .discountRate(discountRate)
                .deliveryFee(deliveryFee)
                .descriptionImg(descriptionImg)
                .smallCategoryName(smallCategory.getSmallCategoryName())
                .brandName(brand.getName())
                .repImg(repImg)
                .price(price)
                .reviewRate(reviewRate)
                .uid(uid)
                .build();
    }
}
