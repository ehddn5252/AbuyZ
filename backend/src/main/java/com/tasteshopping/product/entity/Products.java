package com.tasteshopping.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.product.dto.ProductBoDto;
import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductCreateModifyDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.wish.entity.WishLists;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import static javax.persistence.FetchType.LAZY;


@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;

    @JsonIgnore
    @Column(nullable = false, columnDefinition = "varchar(150) default 'base_product'")
    private String name;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer price;

    @Column(name = "description_img", columnDefinition = "varchar(4500)")
    private String descriptionImg;

    @Column(name = "rep_img", columnDefinition = "varchar(3000)")
    private String repImg;

    @Column(columnDefinition = "varchar(40)")
    private String status;


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

    @CreatedDate
    @Column(name="created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdDate;


    // 양방향 설정
    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductKeywords> productKeywords;

    @OneToMany(mappedBy ="product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductPictures> productPictures;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Inventories> inventories;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ProductOptions> productOptions;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reviews> reviews;

    @OneToMany(mappedBy = "products", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WishLists> wishLists;


    public void addReview(Reviews review){
        reviews.add(review);
    }

    public ProductCreateModifyDto toCreateModifyDto(){
        return ProductCreateModifyDto.builder()
                .productsUid(uid)
                .smallCategoriesUid(smallCategory.getUid())
                .bigCategoriesUid(smallCategory.getBigCategory().getUid())
                .name(name)
                .discountRate(discountRate)
                .reviewRate(reviewRate)
                .price(price)
                .deliveryFee(deliveryFee)
                .brandName(brand.getName())
                .descriptionImg(descriptionImg)
                .repImg(repImg)
                .build();
    }

    public ProductBoDto toBoDto(List<String> productKeywords) {
        return ProductBoDto.builder()
                .uid(uid)
                .date(createdDate)
                .productKeywords(productKeywords)
                .name(name)
                .status(status)
                .discountRate(discountRate)
                .deliveryFee(deliveryFee)
                .descriptionImg(descriptionImg)
                .smallCategoryName(smallCategory.getSmallCategoryName())
                .brandName(brand.getName())
                .price(price)
                .bigCategoryUid(smallCategory.getBigCategory().getUid())
                .bigCategoryName(smallCategory.getBigCategory().getCategoryName())
                .build();
    }

    public ProductDto toDto() {

        return ProductDto.builder()
                .uid(uid)
                .name(name)
                .status(status)
                .discountRate(discountRate)
                .deliveryFee(deliveryFee)
                .descriptionImg(descriptionImg)
                .smallCategoryName(smallCategory.getSmallCategoryName())
                .brandName(brand.getName())
                .repImg(repImg)
                .price(price)
                .reviewRate(reviewRate)
                .uid(uid)
                .date(createdDate)
                .bigCategoryUid(smallCategory.getBigCategory().getUid())
                .bigCategoryName(smallCategory.getBigCategory().getCategoryName())
                .build();
    }
    static public ProductDto setProductDtoReview(Products product){
        ProductDto productDto = product.toDto();
        List<Reviews> reviews = product.getReviews();
        productDto.setReviewNum(reviews.size());
        Float reviewRate = 0f;
        int count = 0;
        for(int j=0;j<reviews.size();++j){
            if(reviews.get(j).getRating()!=0) {
                reviewRate += reviews.get(j).getRating();
            }
            else{
                count+=1;
            }
        }
        reviewRate/=(reviews.size()-count);
        reviewRate = (int)(reviewRate * 100) /100f;
        productDto.setReviewNum(reviews.size()-count);
        productDto.setReviewRate(reviewRate);
        return productDto;
    }

    public void modifyEntity(ProductCreateDto p, SmallCategories smallCategory, Brands brand) {
        this.name= p.getName();
        this.discountRate = p.getDiscountRate();
        this.deliveryFee = p.getDeliveryFee();
        this.smallCategory = smallCategory;
        this.brand = brand;
        this.price = p.getPrice();
        this.reviewRate = p.getReviewRate();
    }
}
