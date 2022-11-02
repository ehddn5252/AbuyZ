package com.tasteshopping.product.entity;

import com.tasteshopping.product.dto.ProductPictureDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPictures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="img_url",columnDefinition = "varchar(500)")
    String imgUrl;

    @ManyToOne(fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="products_uid")
    Products product;

    public ProductPictureDto toDto(){
        ProductPictureDto productPictureDto = new ProductPictureDto();
        productPictureDto.setProductsUid(product.getUid());
        productPictureDto.setImgUrl(imgUrl);
        productPictureDto.setUid(uid);
        return productPictureDto;
    }

}
