package com.tasteshopping.product.service;

import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.entity.SmallCategories;
import com.tasteshopping.product.repository.BrandRepository;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.product.repository.SmallCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BrandRepository brandRepository;

    @Autowired
    SmallCategoryRepository smallCategoryRepository;
    @Override
    public void registerProduct(HashMap<String, Object> param) {
        String brandName = (String)param.get("brand_name");
        Optional<Brands> brandsOptional = brandRepository.findByName(brandName);
        Brands brands = null;
        if(brandsOptional.isPresent()){
            brands=brandsOptional.get();
        }
        Integer smallCategoryUid = (int)param.get("small_categories_uid");
        Optional<SmallCategories> smallCategoriesOptional = smallCategoryRepository.findById(smallCategoryUid);
        SmallCategories smallCategories = null;
        if(smallCategoriesOptional.isPresent()){
            smallCategories = smallCategoriesOptional.get();
        }

        Products product = new Products();
        product.setName((String)param.get("name"));
        product.setDescriptionImg((String)param.get("description_img"));
        product.setReviewRate((float)0);
        product.setDeliveryFee((int)param.get("delivery_fee"));
        product.setPrice((int)param.get("price"));
        product.setDiscountRate((int)param.get("discount_rate"));
        product.setSmallCategory(smallCategories);
        product.setBrand(brands);
        productRepository.save(product);
    }

    @Override
    public List<Products> getAllProduct(){
        List<Products> l = productRepository.findAll();
        return l;
    }

    @Override
    public Optional<Integer> getMaxUid() {
        return productRepository.getMaxUid();
    }
}
