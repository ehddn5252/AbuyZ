package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductPictureDto;
import com.tasteshopping.product.entity.ProductPictures;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductPictureRepository;
import com.tasteshopping.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductPictureServiceImpl implements ProductPictureService {

    @Autowired
    ProductPictureRepository productPictureRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public void createProductPicture(int productsUid, String imgUrl) {
        ProductPictures productPictures = new ProductPictures();
        Optional<Products> productsOptional = productRepository.findById(productsUid);
        if (productsOptional.isPresent()){
            productPictures.setProduct(productsOptional.get());
        }
        else{
            productPictures.setProduct(null);
        }
        productPictures.setImgUrl(imgUrl);
        productPictureRepository.save(productPictures);
    }

    @Override
    public List<ProductPictureDto> getProductPictureByPicturesUid(int productsUid) {

        List<ProductPictureDto> productPictureDtoList = new ArrayList<>();
        List<Optional<ProductPictures>> productPictures = productPictureRepository.findByProductUid(productsUid);

        for(int i=0;i<productPictures.size();++i) {
            productPictureDtoList.add(productPictures.get(i).get().toDto());
        }
        return productPictureDtoList;
    }
}
