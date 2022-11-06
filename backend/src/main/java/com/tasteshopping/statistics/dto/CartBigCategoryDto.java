package com.tasteshopping.statistics.dto;

import lombok.*;

import java.util.TreeMap;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartBigCategoryDto implements Comparable<CartBigCategoryDto>{
    private TreeMap<String,Integer> smallCategories;
    private int totalCount;

    public void update(String smallCategoryName, int count){
        try{
            this.smallCategories.put(smallCategoryName,this.smallCategories.get(smallCategoryName)+count);
        }catch (NullPointerException e){
            this.smallCategories.put(smallCategoryName,count);
        }
        this.totalCount += count;
    }
    @Override
    public int compareTo(CartBigCategoryDto cartBigCategoryDto) {
        return cartBigCategoryDto.getTotalCount()-this.totalCount;
    }
}
