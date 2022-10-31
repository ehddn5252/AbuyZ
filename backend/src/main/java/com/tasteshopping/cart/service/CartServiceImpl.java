package com.tasteshopping.cart.service;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartResDto;
import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.exception.OutOfStockException;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.inventory.repository.InventoryRepository;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
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
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    InventoryRepository inventoryRepository;
    @Override
    @Transactional
    public BaseRes putCart(String email, CartDto cartsDto) {
        System.out.println(cartsDto.toString());
        int productsUid = cartsDto.getProductsUid();
        HashMap<String, String> optionValues = cartsDto.getOptionValues();
        // 상품 옵션 리스트 생성
        Optional<Users> user = userRepository.findByEmail(email);
        String optionListString ="";
        Carts carts= new Carts();
        for (String key : optionValues.keySet()) {
            ProductOptions optionsOptional = productOptionRepository.findByKeyAndValueAndProductsUid(key, optionValues.get(key), productsUid).get();
            optionListString += optionsOptional.getUid()+" ";
            // 장바구니에 저장할 것들 가져옴
        }
        Optional<Inventories> inventory = inventoryRepository.findByOptionListString(optionListString.trim());

        if(inventory.isPresent()){
                if (inventory.get().getCount() < cartsDto.getProductCount()) {
                    throw new OutOfStockException();
                }
                else{
                    carts.modifyInfo(cartsDto.getProductCount(), user.get(), inventory.get());
                    cartRepository.save(carts);
                }
        }
        return new BaseRes(200,"장바구니 담기 성공",null);
    }

    @Override
    @Transactional
    public BaseRes deleteCart(String email, int cartsUid) {
        Optional<Carts> cartsOptional = cartRepository.findById(cartsUid);
        Carts carts = null;
        if (cartsOptional.isPresent()) {
            carts = cartsOptional.get();
            if (carts.getUser().getEmail().equals(email)){
                cartRepository.delete(carts);
                return new BaseRes(200,"삭제 성공.",null);

            }
            else{
                return new BaseRes(404,"적절하지 않은 접근입니다.",null);
            }
        } else {
            return new BaseRes(204,"해당 cart가 없습니다.",null);
        }
    }

    @Override
    public List<CartResDto> getCart(String email) {
        Users user = userRepository.findByEmail(email).get();
        List<Carts> cartsList = cartRepository.findByUser(user);
        List<CartResDto> cartResDtoList = new ArrayList<>();
        for (int i = 0; i < cartsList.size(); ++i) {
            CartResDto cartResDto = new CartResDto();
            Inventories inventories = cartsList.get(i).getInventory();
            cartResDto.setProductDto(cartsList.get(i).getInventory().getProduct().toDto());
            cartResDto.setProductCount(cartsList.get(i).getProductCount());
            cartResDto.setUid(cartsList.get(i).getUid());
            cartResDto.setInventoryDto(cartsList.get(i).getInventory().toDto());
            cartResDtoList.add(cartResDto);
        }

        return cartResDtoList;
    }
}
