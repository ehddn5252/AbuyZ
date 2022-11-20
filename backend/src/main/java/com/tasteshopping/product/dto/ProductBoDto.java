package com.tasteshopping.product.dto;

import com.tasteshopping.inventory.dto.InventoryResDto;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductBoDto {

    private Integer uid;
    private String name;
    private Integer price;
    private Integer discountRate;
    private String descriptionImg;
    private Integer deliveryFee;
    private String smallCategoryName;
    private String bigCategoryName;
    private Integer bigCategoryUid;
    private String brandName;
    private Date date;
    private String status;
    private String repImg;
    private Integer reviewNum;
    private Integer inventoryTotalNum;
    private List<String> productKeywords;
    private List<InventoryResDto> inventoryResDtoList;

}
