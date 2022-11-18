package com.tasteshopping.product.service;

import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.repository.InventoryRepository;
import com.tasteshopping.product.dto.*;
import com.tasteshopping.product.entity.*;
import com.tasteshopping.categories.entity.SmallCategories;
import com.tasteshopping.product.exception.InputIsNotCorrectException;
import com.tasteshopping.product.exception.NoAuthorizationException;
import com.tasteshopping.product.exception.OptionNotFoundException;
import com.tasteshopping.product.exception.ProductNotFoundException;
import com.tasteshopping.product.repository.*;
import com.tasteshopping.categories.repository.SmallCategoryRepository;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.repository.ReviewRepository;
import com.tasteshopping.review.service.AwsS3Service;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.wish.dto.IsWished;
import com.tasteshopping.wish.entity.WishLists;
import com.tasteshopping.wish.repository.WishRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@AllArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductPictureService productPictureService;
    private final ProductOptionService productOptionService;
    private final ProductKeywordService productKeywordService;
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final SmallCategoryRepository smallCategoryRepository;
    private final ProductPictureRepository productPictureRepository;
    private final ProductOptionRepository productOptionRepository;
    private final ProductKeywordRepository productKeywordRepository;
    private final InventoryRepository inventoryRepository;
    private final AwsS3Service awsS3Service;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;

    private final ReviewRepository reviewRepositry;

    @Override
    public BaseRes boSearch(String email, BoSearchReqDto boSearchReqDto) {
        if (userRepository.findByEmail(email).get().getUserRoles() != Role.ADMIN) {
            return new BaseRes(401, "관리자 계정이 아닙니다.", null);
        }
        /*
        대분류 uid
        소분류 uid
        상품명
        브랜드명
        키워드
        판매 상태(전체, 판매 중, 승인 대기, 교환/환불/판매 완료)
         */

        // 키워드로 검색, 시작날짜와 끝날짜로
        // init 에서 모두 가져오고 모든 조건을 한번씩 확인해서 추가한다.
        String keyword = boSearchReqDto.getKeyword();
        Date startDate = boSearchReqDto.getStart_date();
        Date endDate = boSearchReqDto.getEnd_date();
        Integer bigCategoryUid = boSearchReqDto.getBig_categories_uid();
        Integer smallCategoriesUid = boSearchReqDto.getSmall_categories_uid();
        String name = boSearchReqDto.getName();
        String brandName = boSearchReqDto.getBrand_name();
        String status = boSearchReqDto.getStatus();

        // 여기에서 시작, 끝날짜, 이름, smallCategories로 한번 거르고
        if (endDate == null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                endDate = format.parse("2300-1-1");
            } catch (Exception e) {
            }
        }
        if (startDate == null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                startDate = format.parse("1900-1-1");
            } catch (Exception e) {
            }
        }
        if (name == null) {
            name = "%%";
        } else {
            name = "%" + name + "%";
        }

        if (brandName == null) {
            brandName = "%%";
        } else {
            brandName = "%" + brandName + "%";
        }

        if (status == null) {
            status = "%%";
        }

        List<ProductDto> productDtoList = new ArrayList<>();
        // 조인한 결과가나와서 길어짐
        List<Products> productsList = productRepository.boFiltering(name, startDate, endDate, bigCategoryUid, smallCategoriesUid, brandName, status);
        List<Products> retProductsList = new ArrayList<>();
        if (productsList != null) {
            if (keyword != null) {
                for (int i = 0; i < productsList.size(); ++i) {
                    List<ProductKeywords> productKeywords = productsList.get(i).getProductKeywords();
                    for (int j = 0; j < productKeywords.size(); ++j) {
                        if (productKeywords.get(j).getName().contains(keyword)) {
                            retProductsList.add(productsList.get(j));
                        }
                    }
                }
                productsList.clear();
                if (retProductsList.size() != 0) {
                    productsList.addAll(retProductsList);
                }
            }

            for (int i = 0; i < productsList.size(); ++i) {
                int inventorySum = inventoryRepository.getInventoriesSum(productsList.get(i));
                ProductDto productDto = productsList.get(i).toDto();
                productDto.setInventoryNum(inventorySum);
                productDtoList.add(productDto);
            }
        }

        return new BaseRes(200, "bo search 완료", productDtoList);
    }

    @Override
    public BaseRes modifyStatus(String email, int products_uid, String status) {
        Users user = userRepository.findByEmail(email).get();
        if (user.getUserRoles() != Role.ADMIN) {
            throw new NoAuthorizationException();
        }
        Products product = productRepository.findById(products_uid).get();
        product.setStatus(status);
        productRepository.save(product);
        return new BaseRes(200, "상품 상태 변경 성공", null);

    }

    @Override
    @Transactional
    public void putStatus(int uid, String status) {
        Optional<Products> productsOptional = productRepository.findById(uid);
        if (productsOptional.isPresent()) {
            productsOptional.get().setStatus(status);
        }
    }

    @Override
    @Transactional
    public void checkStatus(int uid) {
        Products product = productRepository.findById(uid).get();

        List<Inventories> l = inventoryRepository.findByProduct(product);
        int count = 0;
        for (int i = 0; i < l.size(); ++i) {
            count += l.get(i).getCount();
        }
        //SELLING, SOLD_OUT, GETTING_READY
        if (count == 0) {
            product.setStatus("SOLD_OUT");
        } else {
            product.setStatus("SELLING");
        }
    }

    @Override
    public List<ProductBoDto> getBoAllProduct() {
        List<Products> l = productRepository.findAllFetchJoin();
//        Collections.shuffle(l);
        List<ProductBoDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            List<ProductKeywords> productKeywords = l.get(i).getProductKeywords();
            List<String> keywords = new ArrayList<>();
            // 키워드 설정
            for (int j = 0; j < productKeywords.size(); ++j) {
                keywords.add(productKeywords.get(j).getName());
            }
            ProductBoDto productBoDto = l.get(i).toBoDto(keywords);
            List<Inventories> inventoryList = l.get(i).getInventories();
            if (inventoryList.size() != 0) {
                int count = 0;
                for (int j = 0; j < inventoryList.size(); ++j) {
                    Inventories inventories = inventoryList.get(j);
                    count += inventories.getCount();
                }
                productBoDto.setInventoryTotalNum(count);
            }
            new_l.add(productBoDto);
        }
        return new_l;
    }

    @Override
    public BaseRes getProductCreateInfo(int products_uid) {

        Optional<Products> productsOptional = productRepository.findById(products_uid);

        if (!productsOptional.isPresent()) {
            throw new ProductNotFoundException();
        }
        Products p = productsOptional.get();

        /*

            LinkedHashMap<String,String> imgs; // product_pictures 에서 가져옴 (hash map 으로 가져오기)
            LinkedHashMap<String,String> options; // product_options 에서 가져옴 (여러 개로 분할된 것 붙여서 가져오기)
            String keywords; // product_keywords 에서 가져옴 (여러 개로 분할된 것 붙여서 넣기
            Integer count; // inventory에서 가져와야 함
         */
        ProductCreateModifyDto productCreateModifyDto = p.toCreateModifyDto();
        // 이미지 가져오기, 옵션 가져오기

        // 키워드 세팅
        List<ProductKeywords> productKeywords = p.getProductKeywords();
        String keywords = "";
        for (int i = 0; i < productKeywords.size(); ++i) {
            keywords += productKeywords.get(i).getName() + " ";
        }
        keywords = keywords.trim();
        productCreateModifyDto.setKeywords(keywords);

        // 이미지 세팅
        List<Optional<ProductPictures>> productPictureList = productPictureRepository.findByProductUid(products_uid);
        List<String> imgs = new ArrayList<>();
        for (int i = 0; i < productPictureList.size(); ++i) {
            imgs.add(productPictureList.get(i).get().getImgUrl());
        }
        productCreateModifyDto.setImgs(imgs);
        List<ProductOptions> productOptionsList = p.getProductOptions();

        // 옵션 세팅 
        HashMap<String, String> hashMap = new HashMap<>();
        String name = productOptionsList.get(0).getName();
        ArrayList<String> l = new ArrayList();
        for (int i = 0; i < productOptionsList.size(); ++i) {
            if (name.equals(productOptionsList.get(i).getName())) {
                l.add(productOptionsList.get(i).getValue());
            } else {
                ArrayList newL = new ArrayList<>();
                newL.addAll(l);
                String optionString = "";
                for (int j = 0; j < l.size(); ++j) {
                    optionString += l.get(j) + " ";
                }
                hashMap.put(name, optionString.trim());
                l.clear();
                l.add(productOptionsList.get(i).getValue());
                name = productOptionsList.get(i).getName();
            }
        }
        String optionString = "";

        for (int i = 0; i < l.size(); ++i) {
            optionString += l.get(i) + " ";
        }
        // 마지막에 한번 추가해줘야 한다.
        hashMap.put(name, optionString.trim());
        // 여기에서 옵션 형태를 갖다줘야 함.
        //  HashMap <String,String> 구조
        productCreateModifyDto.setOptions(hashMap);
        return new BaseRes(200, "입력한 값 가져오기 성공", productCreateModifyDto);
    }

    @Override
    public List<ProductDto> getRandom() {
        List<Products> l = productRepository.findByRand();
//        Collections.shuffle(l);
        List<ProductDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            new_l.add(l.get(i).toDto());
        }
        return new_l;
    }

    @Override
    @Transactional
    public void productStatusSetting() {
        List<Products> productsList = productRepository.findAllFetchJoin();

        for (int i = 0; i < productsList.size(); ++i) {
            Products product = productsList.get(i);
            List<Inventories> l = inventoryRepository.findByProduct(product);
//            Integer count = inventoryRepository.sumCount(product);
            int count = 0;
            for (int j = 0; j < l.size(); ++j) {
                count += l.get(j).getCount();
            }
            //SELLING, SOLD_OUT, GETTING_READY
            if (count == 0) {
                product.setStatus("SOLD_OUT");
            } else {
                product.setStatus("SELLING");
            }
        }
    }

    @Override
    public void modifyProductOption(ProductCreateDto productCreateDto) {
        /*
        1. 상품에 맞는 상품 옵션 유아이디를 가져온다. findByProductsUid()
        2. 상품 옵션 유아이디에 맞는 상품 옵션 리스트를 가져온다.
        3. 상품 옵션 리스트를 비우고 다시 생성한다.
         */
        Integer productsUid = productCreateDto.getProductsUid();
        Products product = productRepository.findById(productsUid).get();
        List<ProductOptions> option = productOptionRepository.findByProductsUid(productsUid);
        // 해당 옵션의 옵션 리스트 제거

        for (int i = 0; i < option.size(); ++i) {
            productOptionRepository.deletByProductUid(product.getUid());
        }
        inventoryRepository.deleteByProduct(product);
        LinkedHashMap<String, String> options = productCreateDto.getOptions();
        // null 이면 개별 옵션에 name, value에 옵션 없음, 옵션 없음 넣어주고 inventory 에도 옵션가 0, 가격은 따로
        createOptionsAndInventories(options, productCreateDto, product);
    }


    @Override
    public void modifyProductPicture(ProductCreateDto productCreateDto,
                                     MultipartFile[] multipartFiles) {
        int productUid = productCreateDto.getProductsUid();

        // product 변경

        productPictureRepository.deleteByProductsUid(productUid);
        Products pp = productRepository.findById(productUid).get();
        // save imgs
        int count = 0;
        String imagePath = null; //파일서버에업로드후 img_url 데려오기
        if (multipartFiles.length == 0) {
            productRepository.save(pp);
        }
        for (int i = 0; i < multipartFiles.length; ++i) {
            try {
                imagePath = awsS3Service.uploadImgFile(multipartFiles[i]);
                if (count == 0) {
                    //save product
                    count += 1;
                    pp.setRepImg(imagePath);
                    productRepository.save(pp);
                } else {
                    productPictureService.createProductPicture(productUid, imagePath);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Transactional
    public void createOptionsAndInventories(LinkedHashMap<String, String> options, ProductCreateDto productCreateDto, Products product) {
        if (options == null) {
            ProductOptions productOptions = productOptionService.createProductOptionList(product, "x", "x");
            Inventories inventory = new Inventories();
            if (productCreateDto.getCount() != null) {
                inventory.setCount(productCreateDto.getCount());
            } else {
                inventory.setCount(0);
            }
            inventory.setPrice(0);
            inventory.setProduct(product);
            inventory.setProductOptionList(Integer.toString(productOptions.getUid()));
            inventoryRepository.save(inventory);
        } else {
            ArrayList<LinkedList<String>> optionValueUidOuterList = new ArrayList<>();
            // 상품 옵션 리스트 생성 완료
            int maxUid = 1;
            Optional<Integer> maxOptionOptional = productOptionRepository.getMaxUid();
            if (maxOptionOptional.isPresent()) {
                maxUid = maxOptionOptional.get();
            }

            int start = 0;
            ArrayList<Integer> optionKeyValueNum = new ArrayList<>();
            for (String key : options.keySet()) {
                String[] sList = options.get(key).split(",");
                optionKeyValueNum.add(sList.length);
                optionValueUidOuterList.add(new LinkedList<String>());
                LinkedList<String> l = optionValueUidOuterList.get(start);
                for (int i = 0; i < sList.length; ++i) {
                    maxUid += 1; // 다음 uid 를 저장해야한다.
                    l.add(Integer.toString(maxUid));
                    productOptionService.createProductOptionList(product, key, sList[i].trim());
                }
                optionValueUidOuterList.set(start, l);
                start += 1;
            }

            LinkedList<String> optionListResult = getInventoryList(optionValueUidOuterList, optionValueUidOuterList.get(0), 1);
            // 재고 생성
            int cartesianProductNum = 1;
            for (int i = 0; i < optionKeyValueNum.size(); ++i) {
                cartesianProductNum *= optionKeyValueNum.get(i);
            }

            for (int i = 0; i < cartesianProductNum; ++i) {
                // 칼테시안 곱의 수만큼 할당
                Inventories inventory = new Inventories();
                inventory.setCount(0);
                inventory.setPrice(0);
                inventory.setProduct(product);
                inventory.setProductOptionList(optionListResult.get(i));
                inventoryRepository.save(inventory);
            }
        }
    }

    @Override
    @Transactional
    public BaseRes createProductRelated(ProductCreateDto productCreateDto,
                                        MultipartFile[] multipartFiles,
                                        MultipartFile descriptionImg) {
        /*
            param 이 넘겨오면 해야할 것
            1. Products product 를 생성한다. ok
            2. product_uid 에 맞는 상품 option list를 생성한다. ok
            3. 상품 옵션 리스트에 따른 상품 옵션을 생성
            4. 상품 옵션에 따른 상품 재고 생성
            5. product_uid 에 맞는 product_keywords 를 생성한다.
         */

        Products product = registerProduct(productCreateDto);

        // save imgs
        int count = 0;
        String imagePath = null; //파일서버에업로드후 img_url 데려오기
        BaseRes res = null;
        if (descriptionImg != null) {
            try {
                imagePath = awsS3Service.uploadImgFile(descriptionImg);
                product.setDescriptionImg(imagePath);
            } catch (IOException e) {
                e.printStackTrace();
                res = new BaseRes(202, "파일 업로드 에러", null);
                return res;
            }
        }
        if (multipartFiles == null) {
            productRepository.save(product);
        } else {
            for (int i = 0; i < multipartFiles.length; ++i) {
                try {
                    imagePath = awsS3Service.uploadImgFile(multipartFiles[i]);
                    if (count == 0) {
                        //save product
                        count += 1;
                        product.setRepImg(imagePath);
                        productRepository.save(product);
                    } else {
                        productPictureService.createProductPicture(product.getUid(), imagePath);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    res = new BaseRes(202, "파일 업로드 에러", null);
                    return res;
                }
            }
        }

        // save keyword lists
        String[] keywordList = productCreateDto.getKeywords().split(",");
        for (int i = 0; i < keywordList.length; ++i) {
            productKeywordService.createProductKeyword(keywordList[i].trim(), product.getUid());
        }
        // 개별 옵션, 재고 생성
        createOptionsAndInventories(productCreateDto.getOptions(), productCreateDto, product);
//        // null 이면 개별 옵션에 name, value에 옵션 없음, 옵션 없음 넣어주고 inventory 에도 옵션가 0, 가격은 따로
//        LinkedHashMap<String, String> options = productCreateDto.getOptions();
//        if (options == null) {
//            ProductOptions productOptions = productOptionService.createProductOptionList(pp, "x", "x");
//            Inventories inventory = new Inventories();
//            if (productCreateDto.getCount() != null) {
//                inventory.setCount(productCreateDto.getCount());
//            } else {
//                inventory.setCount(0);
//            }
//            inventory.setPrice(0);
//            inventory.setProduct(pp);
//            inventory.setProductOptionList(Integer.toString(productOptions.getUid()));
//            inventoryRepository.save(inventory);
//        } else {
//            ArrayList<LinkedList<String>> optionValueUidOuterList = new ArrayList<>();
//            // 상품 옵션 리스트 생성 완료
//            int maxUid = 1;
//            Optional<Integer> maxOptionOptional = productOptionRepository.getMaxUid();
//            if (maxOptionOptional.isPresent()) {
//                maxUid = maxOptionOptional.get();
//            }
//
//            int start = 0;
//            ArrayList<Integer> optionKeyValueNum = new ArrayList<>();
//            for (String key : options.keySet()) {
//                String[] sList = options.get(key).split(",");
//                optionKeyValueNum.add(sList.length);
//                optionValueUidOuterList.add(new LinkedList<String>());
//                LinkedList<String> l = optionValueUidOuterList.get(start);
//                for (int i = 0; i < sList.length; ++i) {
//                    maxUid += 1; // 다음 uid 를 저장해야한다.
//                    l.add(Integer.toString(maxUid));
//                    productOptionService.createProductOptionList(pp, key, sList[i].trim());
//                }
//                optionValueUidOuterList.set(start, l);
//                start += 1;
//            }
//
//            LinkedList<String> optionListResult = getInventoryList(optionValueUidOuterList, optionValueUidOuterList.get(0), 1);
//            // 재고 생성
//            int cartesianProductNum = 1;
//            for (int i = 0; i < optionKeyValueNum.size(); ++i) {
//                cartesianProductNum *= optionKeyValueNum.get(i);
//            }
//
//            for (int i = 0; i < cartesianProductNum; ++i) {
//                // 칼테시안 곱의 수만큼 할당
//                Inventories inventory = new Inventories();
//                inventory.setCount(0);
//                inventory.setPrice(0);
//                inventory.setProduct(pp);
//                inventory.setProductOptionList(optionListResult.get(i));
//                inventoryRepository.save(inventory);
//            }
//        }
        return new BaseRes(200, "상품 등록 완료", product.getUid());
    }

    public ArrayList<Integer> createInventoryList(ArrayList<Integer> optionKeyValueNum, Products products, LinkedList<String> optionListResult) {
        int cartesianProductNum = 1;
        for (int i = 0; i < optionKeyValueNum.size(); ++i) {
            cartesianProductNum *= optionKeyValueNum.get(i);
        }

        for (int i = 0; i < cartesianProductNum; ++i) {
            // 칼테시안 곱의 수만큼 할당
            Inventories inventory = new Inventories();
            inventory.setCount(0);
            inventory.setPrice(0);
            inventory.setProduct(products);
            inventory.setProductOptionList(optionListResult.get(i));
            inventoryRepository.save(inventory);
        }
        return null;
    }

    public LinkedList<String> getInventoryList(ArrayList<LinkedList<String>> ll, LinkedList<String> resultList, int current) {
        if (ll.size() == current) {
            return resultList;
        }
        LinkedList<String> l2 = ll.get(current);
        LinkedList<String> result = new LinkedList<>();
        for (int i = 0; i < resultList.size(); ++i) {
            for (int j = 0; j < l2.size(); ++j) {
                String option = resultList.get(i) + " " + l2.get(j);
                result.add(option);
            }
        }
        return getInventoryList(ll, result, current + 1);
    }

    @Override
    @Transactional
    public BaseRes deleteProduct(Integer uid) {
        Optional<Products> productsOptional = productRepository.findById(uid);
        if (productsOptional.isPresent()) {
            productRepository.delete(productsOptional.get());
            return new BaseRes(200, "삭제 성공", null);
        } else {
            throw new ProductNotFoundException();
        }
    }

    @Override
    @Transactional
    public void modifyProductRelated(ProductCreateDto productCreateDto,
                                     MultipartFile[] multipartFiles) {
        // 상품 변경
        modifyProduct(productCreateDto);

        // 상품 이미지 변경 (삭제 후 생성)
//        if (multipartFiles != null) {
//            modifyProductPicture(productCreateDto, multipartFiles);
//        }
        // product_options 변경 (삭제 후 생성)
//        modifyProductOption(productCreateDto);

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
    public List<ProductDto> findByStatus(String status) {
        List<Optional<Products>> l = productRepository.findByStatus(status);
        List<ProductDto> newL = new ArrayList<>();

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
    public List<ProductDto> getProductBySmallCategoryAndDeliveryFee(Integer smallCategoriesUid,
                                                                    Integer deliveryFeeUid) {

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
    public List<ProductDto> getProductBySmallCategoryAndPrice(Integer smallCategoriesUid,
                                                              Integer priceUid) {

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
        Optional<List<Products>> l = productRepository.findByPriceBetweenAndSmallCategory(smallCategoriesUid, start, end);
        List<ProductDto> newL = new ArrayList<>();
        if (l.isPresent()) {
            for (int i = 0; i < l.get().size(); ++i) {
                newL.add(l.get().get(i).toDto());
            }
        }
        return newL;
    }

    @Override
    public ProductDto getOneProduct(Integer productsUid) {
        Optional<Products> p = productRepository.findById(productsUid);
        ProductDto productDto = null;
        if (p.isPresent()) {
            productDto = p.get().toDto();
        }
        return productDto;
    }

    @Override
    public ProductDetailDto getDetailProduct(String email, int uid) {
        Optional<Products> productsOptional = productRepository.findByIdFetchJoin(uid);
        if (productsOptional.isPresent()) {
            Products p = productsOptional.get();
            ProductDetailDto productDetailDto = new ProductDetailDto();
            productDetailDto.setProducts(p.toDto());
            List<ProductPictures> productPicturesList = p.getProductPictures();
            List<ProductOptions> productOptionsList = p.getProductOptions();

            /*
            1. 이름에 맞는 list 에 추가한다.
            2. 이름이 달라지면 hashMap 에 추가한다.
            3. 맨 마지막에 hashMap 에 추가한다.
             */

            HashMap<String, List> hashMap = new HashMap<>();

            if (productOptionsList.isEmpty()) {
                throw new OptionNotFoundException();
            }
            String name = productOptionsList.get(0).getName();
            ArrayList<String> l = new ArrayList();
            for (int i = 0; i < productOptionsList.size(); ++i) {
                if (name.equals(productOptionsList.get(i).getName())) {
                    l.add(productOptionsList.get(i).getValue());
                } else {
                    ArrayList newL = new ArrayList<>();
                    newL.addAll(l);
                    hashMap.put(name, newL);
                    l.clear();
                    l.add(productOptionsList.get(i).getValue());
                    name = productOptionsList.get(i).getName();
                }
            }
            // 마지막에 한번 추가해줘야 한다.
            hashMap.put(name, l);

            List<ProductPictureDto> productPictureDtoList = new ArrayList<>();
            for (int i = 0; i < productPicturesList.size(); ++i) {
                productPictureDtoList.add(productPicturesList.get(i).toDto());
            }
            if (email != null) {
                Optional<WishLists> wish = wishRepository.findByUser_EmailAndProducts_Uid(email, uid);
                if (wish.isPresent()) {
                    productDetailDto.setIsWished(new IsWished(wish.get().getUid(), true));
                }
            }

            productDetailDto.setProductOptionListMap(hashMap);
            productDetailDto.setProductPictureDto(productPictureDtoList);
            return productDetailDto;
        } else {
            throw new ProductNotFoundException();
        }

    }

//    @Override
//    public ProductDetailDto getDetailProduct(String email, int uid) {
//        Optional<Products> productsOptional = productRepository.findById(uid);
//        if (productsOptional.isPresent()) {
//            Products p = productsOptional.get();
//            ProductDetailDto productDetailDto = new ProductDetailDto();
//            productDetailDto.setProducts(p.toDto());
//            List<ProductPictures> productPicturesList = p.getProductPictures();
//            List<ProductOptions> productOptionsList = p.getProductOptions();
//            List<ProductOptionListDto> productOptionListDtoList = new ArrayList<>();
//
//            for (int i = 0; i < productOptionsList.size(); ++i) {
//                productOptionListDtoList.add(productOptionsList.get(i).toDto());
//            }
//            List<ProductPictureDto> productPictureDtoList = new ArrayList<>();
//            for (int i = 0; i < productPicturesList.size(); ++i) {
//                productPictureDtoList.add(productPicturesList.get(i).toDto());
//            }
//            if(email!=null){
//                Optional<WishLists> wish = wishRepository.findByUser_EmailAndProducts_Uid(email,uid);
//                if(wish.isPresent()){
//                    productDetailDto.setIsWished(new IsWished(wish.get().getUid(),true));
//                }
//            }
//
//            productDetailDto.setProductOptionListDtoList(productOptionListDtoList);
//            productDetailDto.setProductPictureDto(productPictureDtoList);
//            return productDetailDto;
//        } else {
//            throw new ProductNotFoundException();
//        }
//
//    }


    @Override
    public List<ProductDto> getProductBySmallCategoryAndPriceBetween(Integer smallCategoriesUid,
                                                                     Integer startPrice,
                                                                     Integer endPrice) {
        int start = startPrice;
        int end = endPrice;
        Optional<List<Products>> l = productRepository.findByPriceBetweenAndSmallCategory(smallCategoriesUid, start, end);
        List<ProductDto> newL = new ArrayList<>();
        if (l.isPresent()) {
            for (int i = 0; i < l.get().size(); ++i) {
                newL.add(l.get().get(i).toDto());
            }
        }
        return newL;
    }

    @Override
    public List<ProductDto> findByKeywordAndFilter(List<ProductDto> newL,
                                                   SearchDto searchDto) {

        // 반환할 리스트
        List<ProductDto> l = new ArrayList<>();
        Integer startPrice = searchDto.getStartPrice();
        Integer endPrice = searchDto.getEndPrice();
        Integer priceId = searchDto.getPriceUid();
        Integer deliveryFeeId = searchDto.getDeliveryFeeUid();
        Integer bigCategoriesUid = searchDto.getBigCategoriesUid();
        l.addAll(newL);
        if (bigCategoriesUid != null) {
            l.clear();
            for (int i = 0; i < newL.size(); ++i) {
                int bigCategoryUid = newL.get(i).getBigCategoryUid();
                if (bigCategoryUid == bigCategoriesUid) {
                    l.add(newL.get(i));
                }
            }
            newL.clear();
            newL.addAll(l);
        }

        if (priceId != null && (startPrice == null || endPrice == null)) {
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
            for (int i = 0; i < newL.size(); ++i) {
                int price = newL.get(i).getPrice();
                if (price >= start && price <= end) {
                    l.add(newL.get(i));
                }
            }
            newL.clear();
            newL.addAll(l);
        }
        if (deliveryFeeId != null) {
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
            for (int i = 0; i < newL.size(); ++i) {
                int price = newL.get(i).getPrice();
                if (price >= startDeliveryFee && price <= endDeliveryFee) {
                    l.add(newL.get(i));
                }
            }
            newL.clear();
            newL.addAll(l);
        }
        System.out.println(newL.size());
        // 시작 가격과 끝 가격이 있다면 체크
        if (startPrice != null && endPrice != null) {
            l.clear();
            for (int i = 0; i < newL.size(); ++i) {
                int price = newL.get(i).getPrice();
                if (price >= startPrice && price <= endPrice) {
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
        String[] keywordList = productCreateDto.getKeywords().split(",");
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
        Integer smallCategoryUid = productCreateDto.getSmallCategoriesUid();
        Optional<SmallCategories> smallCategoriesOptional = smallCategoryRepository.findById(smallCategoryUid);
        SmallCategories smallCategory = null;
        if (smallCategoriesOptional.isPresent()) {
            smallCategory = smallCategoriesOptional.get();
        }

        product.modifyEntity(productCreateDto, smallCategory, brand);
        productRepository.save(product);
    }

    @Override
    public Products registerProduct(ProductCreateDto productCreateDto) {
        String brandName = productCreateDto.getBrandName();
        Optional<Brands> brandsOptional = brandRepository.findByName(brandName);
        Brands brands = null;
        if (brandsOptional.isPresent()) {
            brands = brandsOptional.get();
        }
        else{
            throw new InputIsNotCorrectException();
        }
        Integer smallCategoryUid = productCreateDto.getSmallCategoriesUid();//int)param.get("small_categories_uid");
        Optional<SmallCategories> smallCategoriesOptional = smallCategoryRepository.findById(smallCategoryUid);
        SmallCategories smallCategories = null;
        if (smallCategoriesOptional.isPresent()) {
            smallCategories = smallCategoriesOptional.get();
        }
        Products product1 = ProductCreateDto.toEntity(productCreateDto, brands, smallCategories);
        product1.setCreatedDate(UtilService.getToday());
        return productRepository.save(product1);
    }

    @Override
    public List<ProductDto> getAllProduct() {
        List<Products> l = productRepository.findAllFetchJoinWithReview();
        List<ProductDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            ProductDto productDto = l.get(i).toDto();
            List<Reviews> reviews = l.get(i).getReviews();
            productDto.setReviewNum(reviews.size());
            Float reviewRate = 0f;
            for(int j=0;j<reviews.size();++j){
                reviewRate+=reviews.get(j).getRating();
            }
            reviewRate/=reviews.size();
            reviewRate = (int)(reviewRate * 100) /100f;
            productDto.setReviewNum(reviews.size());
            productDto.setReviewRate(reviewRate);
            new_l.add(productDto);
        }
        return new_l;
    }
}
