package com.tasteshopping.product.service;


import com.tasteshopping.product.dto.ProductPictureDto;

import java.util.List;

public interface ProductPictureService {
    public void createProductPicture(int productsUid, String imgUrl);

    List<ProductPictureDto> getProductPictureByPicturesUid(int productsUid);
}
