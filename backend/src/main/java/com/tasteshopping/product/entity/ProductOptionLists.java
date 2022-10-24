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
public class ProductOptionLists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(columnDefinition = "varchar(50)")
    String name;

    @Column(columnDefinition = "varchar(100)")
    String value;

    @Column(name="option_price")
    Integer optionPrice;

    @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="product_options_uid")
    ProductOptions productOptions;

    public ProductOptionListDto toDto(){
        ProductOptionListDto productOptionListDto = new ProductOptionListDto();
        productOptionListDto.setProductOptionsUid(productOptions.getUid());
        productOptionListDto.setUid(uid);
        productOptionListDto.setOptionPrice(optionPrice);
        productOptionListDto.setName(name);
        productOptionListDto.setValue(value);
        return productOptionListDto;
    }
}
