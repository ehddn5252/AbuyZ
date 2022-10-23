package com.tasteshopping.cart.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.product.dto.ProductOptionListDto;
import com.tasteshopping.product.entity.ProductOptionLists;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.product.service.ProductOptionListService;
import com.tasteshopping.product.service.ProductOptionService;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductOptionService productOptionService;

    @Autowired
    ProductOptionListService productOptionListService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;

    @Override
    @Transactional
    public void putCart(String email, CartDto cartsDto) {
        int productsUid = cartsDto.getProductsUid();
        HashMap<String, String> optionValues = cartsDto.getOptionValues();

        // 상품 옵션 생성
        productOptionService.createProductOption(productsUid, false);

        int optionsUid = 1;
        Optional<Integer> maxOptionUidOptional = productOptionService.getMaxUid();
        if (maxOptionUidOptional.isPresent()) {
            optionsUid = maxOptionUidOptional.get();
        }

        // 상품 옵션 리스트 생성
        for (String key : optionValues.keySet()) {
            productOptionListService.createProductOptionList(key, optionValues.get(key).trim(), optionsUid);
        }

        // 장바구니에 저장할 것들 가져옴
        Optional<Products> products = productRepository.findById(productsUid);
        Optional<Users> user = userRepository.findByEmail(email);
        Optional<ProductOptions> productOptions = productOptionRepository.findById(optionsUid);

        Carts carts = new Carts();
        carts.modifyInfo(cartsDto.getProductCount(), user.get(), products.get(), productOptions.get());
        cartRepository.save(carts);

    }

    @Override
    @Transactional
    public void deleteCart(int cartsUid) {
        Optional<Carts> cartsOptional = cartRepository.findById(cartsUid);
        Carts carts = null;
        if (cartsOptional.isPresent()) {
            carts = cartsOptional.get();
            cartRepository.delete(carts);
        } else {
            System.out.println("not found cartsUid");
        }
    }

    @Override
    public List<CartResDto> getCart(String email) {
        Users user = userRepository.findByEmail(email).get();
        List<Carts> cartsList = cartRepository.findByUsersUid(user.getUid());
        List<CartResDto> cartResDtoList = new ArrayList<>();
        for (int i = 0; i < cartsList.size(); ++i) {
            CartResDto cartResDto = new CartResDto();
            List<ProductOptionLists> productOptionLists = cartsList.get(i).getProductOption().getProductOptionLists();
            List<ProductOptionListDto> productOptionListDtos = new ArrayList<>();
            for (int j = 0; j < productOptionLists.size(); ++j) {
                productOptionListDtos.add(productOptionLists.get(j).toDto());
            }
            cartResDto.setProductOptionListDto(productOptionListDtos);
            cartResDto.setProductDto(cartsList.get(i).getProduct().toDto());
            cartResDto.setProductCount(cartsList.get(i).getProductCount());
            cartResDto.setUid(cartsList.get(i).getUid());
            cartResDtoList.add(cartResDto);
        }

        return cartResDtoList;
    }
}
