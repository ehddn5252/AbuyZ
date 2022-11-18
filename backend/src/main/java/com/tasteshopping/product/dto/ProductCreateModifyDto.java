package com.tasteshopping.product.dto;

import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.Products;
import lombok.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateModifyDto {
    Integer productsUid; // product에서 가져옴
    Integer smallCategoriesUid; // products 에서 가져옴
    Integer bigCategoriesUid; // products 에서 가져옴
    String name; // products 에서 가져옴
    Integer discountRate; // products 에서 가져옴
    Float reviewRate; // products 에서 가져옴
    Integer price; // products 에서 가져옴
    Integer deliveryFee; // products 에서 가져옴
    String brandName; // products 에서 가져옴
    String descriptionImg; // products 에서 가져옴
    String repImg; // products 에서 가져옴
    String userId; //

    List<String> imgs; // product_pictures 에서 가져옴 (hash map 으로 가져오기)
    HashMap<String,String> options; // product_options 에서 가져옴 (여러 개로 분할된 것 붙여서 가져오기)
    String keywords; // product_keywords 에서 가져옴 (여러 개로 분할된 것 붙여서 넣기
    Integer count; // inventory에서 가져와야 함
}
