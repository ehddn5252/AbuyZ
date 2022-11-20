package com.tasteshopping.product.entity;

import com.tasteshopping.product.dto.ProductOptionListDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(columnDefinition = "varchar(50)")
    String name;

    @Column(columnDefinition = "varchar(100)")
    String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "products_uid")
    Products product;

    // 양방향 설정

    public ProductOptionListDto toDto(){
        ProductOptionListDto productOptionListDto = new ProductOptionListDto();
        productOptionListDto.setUid(uid);
        productOptionListDto.setName(name);
        productOptionListDto.setValue(value);
        return productOptionListDto;
    }
}
