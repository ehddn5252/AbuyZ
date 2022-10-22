package com.tasteshopping.product.service;

import com.tasteshopping.product.dto.ProductCreateDto;
import com.tasteshopping.product.dto.ProductDto;
import com.tasteshopping.product.entity.Brands;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.product.repository.*;
import com.tasteshopping.categories.repository.SmallCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductPictureService productPictureService;

    @Autowired
    ProductOptionService productOptionService;

    @Autowired
    ProductOptionListService productOptionListService;

    @Autowired
    ProductKeywordService productKeywordService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BrandRepository brandRepository;

    @Autowired
    SmallCategoryRepository smallCategoryRepository;

    @Autowired
    ProductPictureRepository productPictureRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    ProductOptionListRepository productOptionListRepository;

    @Autowired
    ProductKeywordRepository productKeywordRepository;

    @Override
    public void modifyProductOption(ProductCreateDto productCreateDto){
        /*
        1. 상품에 맞는 상품 옵션 유아이디를 가져온다. findByProductsUid()
        2. 상품 옵션 유아이디에 맞는 상품 옵션 리스트를 가져온다.
        3. 상품 옵션 리스트를 비우고 다시 생성한다.
         */
        Integer productsUid = productCreateDto.getProductsUid();
        Optional<ProductOptions> option = productOptionRepository.findByProductsUid(productsUid);
        int optionUid = 1;
        // 해당 옵션의 옵션 리스트 제거
        if(option.isPresent()){
            optionUid= option.get().getUid();
            productOptionListRepository.deleteByProductOptionsUid(optionUid);
        }
        
        // 옵션 리스트 추가
        LinkedHashMap<String, String> options = productCreateDto.getOptions(); //(LinkedHashMap<String, String>) param.get("options");

        for (String key : options.keySet()) {
            String[] sList = options.get(key).split(",");
            for (int i = 0; i < sList.length; ++i) {
                productOptionListService.createProductOptionList(key, sList[i].trim(), optionUid);
            }
        }
    }

    @Override
    public void modifyProductPicture(ProductCreateDto productCreateDto) {
        // product 변경
        productPictureRepository.deleteByProductsUid(productCreateDto.getProductsUid());

        // save imgs
        LinkedHashMap<String, String> imgs = productCreateDto.getImgs();
        int count=0;
        Products pp =productRepository.findById(productCreateDto.getProductsUid()).get();
        for (String key : imgs.keySet()){
            if (count==0){
                //save product
                count+=1;
                pp.setRepImg(imgs.get(key));
                productRepository.save(pp);
            }
            productPictureService.createProductPicture(productCreateDto.getProductsUid(), imgs.get(key));
        }
    }

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
        int productsUid = 1;
        Optional<Integer> maxUidOptional = getMaxUid();
        if (maxUidOptional.isPresent()) {
            productsUid = maxUidOptional.get();
        }
        Products pp =productRepository.findById(productsUid).get();

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
            productPictureService.createProductPicture(productsUid, imgs.get(key));
        }

        //save product_options
        LinkedHashMap<String, String> options = productCreateDto.getOptions(); //(LinkedHashMap<String, String>) param.get("options");

        productOptionService.createProductOption(productsUid);

        int optionsUid = 1;
        Optional<Integer> maxOptionUidOptional = productOptionService.getMaxUid();
        if (maxOptionUidOptional.isPresent()) {
            optionsUid = maxOptionUidOptional.get();
        }
        // save product_option_lists
        for (String key : options.keySet()) {
            String[] sList = options.get(key).split(",");
            for (int i = 0; i < sList.length; ++i) {
                productOptionListService.createProductOptionList(key, sList[i].trim(), optionsUid);
            }
        }
        // save keyword lists
        String[] keywordList = productCreateDto.getKeywords().split(","); //((String) param.get("keywords")).split(",");
        for (int i = 0; i < keywordList.length; ++i) {
            productKeywordService.createProductKeyword(keywordList[i].trim(), productsUid);
        }
    }

    @Override
    public void deleteProduct(Integer uid) {

        Products product = productRepository.findById(uid).get();

        productRepository.delete(product);
    }

    @Override
    @Transactional
    public void modifyProductRelated(ProductCreateDto productCreateDto){
        // 상품 변경
        modifyProduct(productCreateDto);
        
        // 상품 이미지 변경 (삭제 후 생성)
        modifyProductPicture(productCreateDto);

        // product_options 변경 (삭제 후 생성)
        modifyProductOption(productCreateDto);

        // product_uid 에 맞는 product_keywords 변경 (삭제 후 생성)
        modifyProductKeywords(productCreateDto);

    }

    @Override
    public List<Optional<Products>> findByKeyword(String keyword) {
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("11111111111111111111111");
        List<Optional<Products>> l= productRepository.findByNameContains(keyword);
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println("========================");
        System.out.println(l);
        System.out.println("22222222222222222222222");
        return productRepository.findByNameContains(keyword);
    }

    private void modifyProductKeywords(ProductCreateDto productCreateDto) {

        Integer productsUid = productCreateDto.getProductsUid();
        // 삭제
        productKeywordRepository.deleteByProductsUid(productsUid);
        // 생성
        String[] keywordList = productCreateDto.getKeywords().split(","); //((String) param.get("keywords")).split(",");
        for (int i = 0; i < keywordList.length; ++i) {
            productKeywordService.createProductKeyword(keywordList[i].trim(), productsUid);
        }
    }

    @Override
    public void modifyProduct(ProductCreateDto productCreateDto) {
        // product 변경
        Products product = productRepository.findById(productCreateDto.getProductsUid()).get();

        // brand 설정
        String brandName = productCreateDto.getBrandName();
        Optional<Brands> brandsOptional = brandRepository.findByName(brandName);
        Brands brand = null;
        if (brandsOptional.isPresent()) {
            brand = brandsOptional.get();
        }

        // small category 설정
        Integer smallCategoryUid = productCreateDto.getSmallCategoriesUid();//int)param.get("small_categories_uid");
        Optional<SmallCategories> smallCategoriesOptional = smallCategoryRepository.findById(smallCategoryUid);
        SmallCategories smallCategory = null;
        if (smallCategoriesOptional.isPresent()) {
            smallCategory = smallCategoriesOptional.get();
        }

        product.modifyEntity(productCreateDto,smallCategory,brand);
        productRepository.save(product);

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
