package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.entity.SmallCategories;
import com.tasteshopping.product.repository.BrandRepository;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.product.repository.SmallCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BrandRepository brandRepository;

    @Autowired
    SmallCategoryRepository smallCategoryRepository;

    @Autowired
    ProductPictureService productPictureService;

    @Autowired
    ProductOptionService productOptionService;

    @Autowired
    ProductOptionListService productOptionListService;

    @Autowired
    ProductKeywordService productKeywordService;

    @Override
    @Transactional
    public void createProductRelated(ProductCreateDto productCreateDto) {
        /*
            param 이 넘겨오면 해야할 것
            1. Products product 를 생성한다. ok
            2. product_uid 에 맞는 product_pictures 를 생성한다. ok
            3. product_uid 에 맞는 product_options 를 생성한다.
            4. product_options에 맞는 product_option_lists를 생성한다.
            5. product_uid 에 맞는 product_keywords 를 생성한다.
         */

        registerProduct(productCreateDto);
        int products_uid = 1;
        Optional<Integer> maxUidOptional = getMaxUid();
        if (maxUidOptional.isPresent()) {
            products_uid = maxUidOptional.get();
        }
        Products pp =productRepository.findById(products_uid).get();

        // save imgs
        LinkedHashMap<String, String> imgs = productCreateDto.getImgs();
        int count=0;
        for (String key : imgs.keySet()) {
            if (count==0){
                //save product
                count+=1;
                pp.setRepImg(imgs.get(key));
                productRepository.save(pp);
            }
            productPictureService.createProductPicture(products_uid, imgs.get(key));
        }

        //save product_options
        LinkedHashMap<String, String> options = productCreateDto.getOptions(); //(LinkedHashMap<String, String>) param.get("options");

        productOptionService.createProductOption(products_uid);

        int options_uid = 1;
        Optional<Integer> maxOptionUidOptional = productOptionService.getMaxUid();
        if (maxOptionUidOptional.isPresent()) {
            options_uid = maxOptionUidOptional.get();
        }
        // save product_option_lists
        for (String key : options.keySet()) {
            String[] sList = options.get(key).split(",");
            for (int i = 0; i < sList.length; ++i) {
                productOptionListService.createProductOptionList(key, sList[i].trim(), options_uid);
            }
        }
        // save keyword lists
        String[] keywordList = productCreateDto.getKeywords().split(","); //((String) param.get("keywords")).split(",");
        for (int i = 0; i < keywordList.length; ++i) {
            productKeywordService.createProductKeyword(keywordList[i].trim(), products_uid);
        }
    }

    @Override
    public void deleteProduct(Integer uid) {

        Products product = productRepository.findById(uid).get();
        System.out.println(product.toString());
        System.out.println("=============================");

        productRepository.delete(product);
    }

    @Override
    public void registerProduct(ProductCreateDto productCreateDto) {
        String brandName = productCreateDto.getBrandName();
        Optional<Brands> brandsOptional = brandRepository.findByName(brandName);
        Brands brands = null;
        if (brandsOptional.isPresent()) {
            brands = brandsOptional.get();
        }
        Integer smallCategoryUid = productCreateDto.getSmallCategoriesUid();//int)param.get("small_categories_uid");
        Optional<SmallCategories> smallCategoriesOptional = smallCategoryRepository.findById(smallCategoryUid);
        SmallCategories smallCategories = null;
        if (smallCategoriesOptional.isPresent()) {
            smallCategories = smallCategoriesOptional.get();
        }
        // Builder 로 변경

        Products product1 =  ProductCreateDto.toEntity(productCreateDto,brands,smallCategories);
        productRepository.save(product1);
    }


    @Override
    public List<ProductDto> getAllProduct() {
        List<Products> l = productRepository.findAll();
        System.out.println("===================================");
        System.out.println(l);
        System.out.println("===================================");

        List<ProductDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            new_l.add(l.get(i).toDto());
        }

        return new_l;
    }

    @Override
    public Optional<Integer> getMaxUid() {
        return productRepository.getMaxUid();
    }
}
