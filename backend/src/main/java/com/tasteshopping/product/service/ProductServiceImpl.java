package com.tasteshopping.product.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.*;
import com.tasteshopping.product.entity.*;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.product.repository.*;
import com.tasteshopping.categories.repository.SmallCategoryRepository;
import com.tasteshopping.review.service.AwsS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import javax.transaction.Transactional;
import java.io.IOException;
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

    @Autowired
    AwsS3Service awsS3Service;

    @Override
    public void modifyProductOption(ProductCreateDto productCreateDto) {
        /*
        1. 상품에 맞는 상품 옵션 유아이디를 가져온다. findByProductsUid()
        2. 상품 옵션 유아이디에 맞는 상품 옵션 리스트를 가져온다.
        3. 상품 옵션 리스트를 비우고 다시 생성한다.
         */
        Integer productsUid = productCreateDto.getProductsUid();
        Optional<ProductOptions> option = productOptionRepository.findByProductsUid(productsUid);
        int optionUid = 1;
        // 해당 옵션의 옵션 리스트 제거
        if (option.isPresent()) {
            optionUid = option.get().getUid();
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
        int count = 0;
        Products pp = productRepository.findById(productCreateDto.getProductsUid()).get();
        for (String key : imgs.keySet()) {
            if (count == 0) {
                //save product
                count += 1;
                pp.setRepImg(imgs.get(key));
                productRepository.save(pp);
            }
            productPictureService.createProductPicture(productCreateDto.getProductsUid(), imgs.get(key));
        }
    }

//    @Override
//    @Transactional
//    public void createProductRelated(ProductCreateDto productCreateDto) {
//        /*
//            param 이 넘겨오면 해야할 것
//            1. Products product 를 생성한다. ok
//            2. product_uid 에 맞는 product_pictures 를 생성한다. ok
//            3. product_uid 에 맞는 product_options 를 생성한다.
//            4. product_options에 맞는 product_option_lists를 생성한다.
//            5. product_uid 에 맞는 product_keywords 를 생성한다.
//         */
//
//        registerProduct(productCreateDto);
//        int productsUid = 1;
//        Optional<Integer> maxUidOptional = getMaxUid();
//        if (maxUidOptional.isPresent()) {
//            productsUid = maxUidOptional.get();
//        }
//        Products pp = productRepository.findById(productsUid).get();
//
//        // save imgs
//        LinkedHashMap<String, String> imgs = productCreateDto.getImgs();
//        int count = 0;
//        for (String key : imgs.keySet()) {
//            if (count == 0) {
//                //save product
//                count += 1;
//                pp.setRepImg(imgs.get(key));
//                productRepository.save(pp);
//            }
//            productPictureService.createProductPicture(productsUid, imgs.get(key));
//        }
//
//        //save product_options
//        LinkedHashMap<String, String> options = productCreateDto.getOptions(); //(LinkedHashMap<String, String>) param.get("options");
//
//        productOptionService.createProductOption(productsUid,true);
//
//        int optionsUid = 1;
//        Optional<Integer> maxOptionUidOptional = productOptionService.getMaxUid();
//        if (maxOptionUidOptional.isPresent()) {
//            optionsUid = maxOptionUidOptional.get();
//        }
//        // save product_option_lists
//        for (String key : options.keySet()) {
//            String[] sList = options.get(key).split(",");
//            for (int i = 0; i < sList.length; ++i) {
//                productOptionListService.createProductOptionList(key, sList[i].trim(), optionsUid);
//            }
//        }
//        // save keyword lists
//        String[] keywordList = productCreateDto.getKeywords().split(","); //((String) param.get("keywords")).split(",");
//        for (int i = 0; i < keywordList.length; ++i) {
//            productKeywordService.createProductKeyword(keywordList[i].trim(), productsUid);
//        }
//    }

    @Override
    @Transactional
    public BaseRes createProductRelated(ProductCreateDto productCreateDto, MultipartFile[] multipartFiles) {
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
        Products pp = productRepository.findById(productsUid).get();

        // save imgs
        int count = 0;
        String imagePath = null; //파일서버에업로드후 img_url 데려오기
        BaseRes res = null;
        if(multipartFiles.length==0){
            productRepository.save(pp);
        }
        for (int i=0;i<multipartFiles.length;++i) {
            try {
                imagePath = awsS3Service.uploadImgFile(multipartFiles[i]);
                if (count == 0) {
                    //save product
                    count += 1;
                    pp.setRepImg(imagePath);
                    productRepository.save(pp);
                } else {
                    productPictureService.createProductPicture(productsUid, imagePath);
                }
            }
            catch (IOException e){
                e.printStackTrace();
                res = new BaseRes(202,"파일 업로드 에러", null);
                return res;
            }
        }
        

        //save product_options
        LinkedHashMap<String, String> options = productCreateDto.getOptions(); //(LinkedHashMap<String, String>) param.get("options");

        productOptionService.createProductOption(productsUid,true);

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

        return new BaseRes(200,"상품 등록 완료", null);
    }

    @Override
    public void deleteProduct(Integer uid) {

        Products product = productRepository.findById(uid).get();

        productRepository.delete(product);
    }

    @Override
    @Transactional
    public void modifyProductRelated(ProductCreateDto productCreateDto) {
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
    public List<ProductDto> findByKeyword(String keyword) {

        List<Optional<Products>> l = productRepository.findByNameContains(keyword);
        List<ProductDto> newL = new ArrayList<>();
        // 여기에 옵션 리스트, 사진, 키워드,
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public List<ProductDto> getProductBySmallCategory(int smallCategoriesUid) {
        List<Optional<Products>> l = productRepository.findBySmallCategory(smallCategoriesUid);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public List<ProductDto> getProductByBigCategory(Integer bigCategoriesUid) {
        List<Optional<Products>> l = productRepository.findByBigCategory(bigCategoriesUid);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public List<ProductDto> getProductByDeliveryFee(Integer deliveryFeeUid) {
        int start = 0;
        int end = 0;
        if (deliveryFeeUid == DeliveryFee.UNDER_3000.ordinal()) {
            start = 1;
            end = 3000;
        } else if (deliveryFeeUid == DeliveryFee.OVER_3000.ordinal()) {
            start = 3001;
            end = Integer.MAX_VALUE;
        }
        List<Optional<Products>> l = productRepository.findByDeliveryFeeBetween(start, end);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public List<ProductDto> getProductByPrice(Integer priceUid) {

        int start = 0;
        int end = 50000;

        if (priceUid == Price.UNDER_100000.ordinal()) {
            start = 30001;
            end = 100000;
        } else if (priceUid == Price.UNDER_300000.ordinal()) {
            start = 100001;
            end = 300000;
        } else if (priceUid == Price.OVER_300000.ordinal()) {
            start = 300001;
            end = Integer.MAX_VALUE;
        }

        List<Optional<Products>> l = productRepository.findByPriceBetween(start, end);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public List<ProductDto> getProductBySmallCategoryAndDeliveryFee(Integer smallCategoriesUid, Integer deliveryFeeUid) {

        int start = 0;
        int end = 0;
        if (deliveryFeeUid == DeliveryFee.UNDER_3000.ordinal()) {
            start = 1;
            end = 3000;
        } else if (deliveryFeeUid == DeliveryFee.OVER_3000.ordinal()) {
            start = 3001;
            end = Integer.MAX_VALUE;
        }

        List<Optional<Products>> l = productRepository.findByDeliveryFeeBetweenAndSmallCategory(smallCategoriesUid, start, end);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public List<ProductDto> getProductBySmallCategoryAndPrice(Integer smallCategoriesUid, Integer priceUid) {

        int start = 0;
        int end = 30000;

        if (priceUid == Price.UNDER_100000.ordinal()) {
            start = 30001;
            end = 100000;
        } else if (priceUid == Price.UNDER_300000.ordinal()) {
            start = 100001;
            end = 300000;
        } else if (priceUid == Price.OVER_300000.ordinal()) {
            start = 300001;
            end = Integer.MAX_VALUE;
        }
        List<Optional<Products>> l = productRepository.findByPriceBetweenAndSmallCategory(smallCategoriesUid, start, end);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }
        return newL;
    }

    @Override
    public ProductDto getOneProduct(Integer productsUid) {
        Optional<Products> p = productRepository.findById(productsUid);
        ProductDto productDto = null;
        if(p.isPresent()){
            productDto = p.get().toDto();
        }
        return productDto;
    }

    @Override
    public ProductDetailDto getDetailProduct(int productsUid) {

        Optional<Products> l = productRepository.findProductDetailByProductsUid(productsUid);
        ProductDetailDto productDetailDto = new ProductDetailDto();
        if(l.isPresent()){
            Products p = l.get();
            productDetailDto.setProducts(p.toDto());
            List<ProductPictures> productPicturesList = p.getProductPictures();
            List<ProductOptions> productOptionsList= p.getProductOptions();
            List<ProductOptionLists> productOptionLists = new ArrayList<>();
            if(productOptionsList.size()!=0){
                productOptionLists = productOptionsList.get(0).getProductOptionLists();
            }
            List<ProductOptionListDto> productOptionListDtoList = new ArrayList<>();

            for(int i=0;i<productOptionLists.size();++i){
                productOptionListDtoList.add(productOptionLists.get(i).toDto());
            }
            List<ProductPictureDto> productPictureDtoList = new ArrayList<>();
            for(int i=0;i<productPicturesList.size();++i){
                productPictureDtoList.add(productPicturesList.get(i).toDto());
            }
            productDetailDto.setProductOptionListDtoList(productOptionListDtoList);
            productDetailDto.setProductPictureDto(productPictureDtoList);
        }
        return productDetailDto;
    }

    @Override
    public List<ProductDto> getProductBySmallCategoryAndPriceBetween(Integer smallCategoriesUid, Integer startPrice, Integer endPrice) {
        int start = startPrice;
        int end = endPrice;
        List<Optional<Products>> l = productRepository.findByPriceBetweenAndSmallCategory(smallCategoriesUid, start, end);
        List<ProductDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).get().toDto());
        }

        return null;
    }

    @Override
    public List<ProductDto> findByKeywordAndFilter(List<ProductDto> newL, SearchDto searchDto) {

        // 반환할 리스트
        List<ProductDto> l= new ArrayList<>();

        Integer startPrice = searchDto.getStartPrice();
        Integer endPrice = searchDto.getEndPrice();
        Integer priceId = searchDto.getPriceUid();
        Integer deliveryFeeId = searchDto.getDeliveryFeeUid();
        Integer bigCategoriesUid = searchDto.getBigCategoriesUid();
        l.addAll(newL);
        if(bigCategoriesUid!=null){
            l.clear();
            for(int i=0;i<newL.size();++i){
                int bigCategoryUid = newL.get(i).getBigCategoryUid();
                if(bigCategoryUid==bigCategoriesUid){
                    l.add(newL.get(i));
                }
            }
            newL.clear();
            newL.addAll(l);
        }

        if(priceId !=null && (startPrice==null || endPrice==null)){
            l.clear();
            int start = 0;
            int end = 30000;

            if (priceId == Price.UNDER_100000.ordinal()) {
                start = 30001;
                end = 100000;
            } else if (priceId == Price.UNDER_300000.ordinal()) {
                start = 100001;
                end = 300000;
            } else if (priceId == Price.OVER_300000.ordinal()) {
                start = 300001;
                end = Integer.MAX_VALUE;
            }
            for(int i=0;i< newL.size();++i){
                int price = newL.get(i).getPrice();
                if(price>=start && price<=end){
                    l.add(newL.get(i));
                }
            }
            newL.clear();
            newL.addAll(l);
        }
        if(deliveryFeeId!=null){
            l.clear();
            int startDeliveryFee = 0;
            int endDeliveryFee = 0;
            if (deliveryFeeId == DeliveryFee.UNDER_3000.ordinal()) {
                startDeliveryFee = 1;
                endDeliveryFee = 3000;
            } else if (deliveryFeeId == DeliveryFee.OVER_3000.ordinal()) {
                startDeliveryFee = 3001;
                endDeliveryFee = Integer.MAX_VALUE;
            }
            for(int i=0;i< newL.size();++i){
                int price = newL.get(i).getPrice();
                if(price>=startDeliveryFee && price<=endDeliveryFee){
                    l.add(newL.get(i));
                }
            }
            newL.clear();
            newL.addAll(l);
        }
        System.out.println(newL.size());
        // 시작 가격과 끝 가격이 있다면 체크
        if(startPrice!=null && endPrice!=null){
            l.clear();
            for(int i=0;i< newL.size();++i){
                int price = newL.get(i).getPrice();
                if(price>=startPrice && price<=endPrice){
                    l.add(newL.get(i));
                }
            }
        }
        return l;
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

        product.modifyEntity(productCreateDto, smallCategory, brand);
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
        Products product1 = ProductCreateDto.toEntity(productCreateDto, brands, smallCategories);
        productRepository.save(product1);
    }


    @Override
    public List<ProductDto> getAllProduct() {
        List<Products> l = productRepository.findAll();
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
