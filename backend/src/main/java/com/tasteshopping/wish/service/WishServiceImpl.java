package com.tasteshopping.wish.service;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.wish.dto.WishListDto;
import com.tasteshopping.wish.dto.WishUidDto;
import com.tasteshopping.wish.entity.WishLists;
import com.tasteshopping.wish.repository.WishRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class WishServiceImpl implements WishService {
    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    private final ProductRepository productRepository;
    @Override
    public ResponseDto getWishList(String email, Pageable pageable) {
        ResponseDto responseDto = new ResponseDto();
        Page<WishLists> result = wishRepository.findByUserEmail(email, pageable);

        WishListDto listDto = new WishListDto(new ArrayList<>(),0);

        for(WishLists wish:result){
            listDto.getProducts().add(wish.toWishProductDto());
            listDto.upProductCount();
        }

        if(listDto.getCount()==0){
            responseDto.setMessage("찜한 것이 없음");
        }else{
            responseDto.setData(listDto);
        }

        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto wish(String email, String product_uid) {
        ResponseDto responseDto = new ResponseDto();
        Users user = userRepository.findByEmail(email).get();
        Products products = productRepository.findById(Integer.parseInt(product_uid)).get();

        if(wishRepository.findByUserAndProducts(user, products).isPresent()) {
            responseDto.setMessage("이미 찜");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        WishLists wishLists =WishLists.builder()
                            .user(user)
                            .products(products)
                            .build();
        wishRepository.save(wishLists);
        responseDto.setMessage("추가 완료");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto cancel(String email, WishUidDto wishUidDto) {
        ResponseDto responseDto = new ResponseDto();
        Users user = userRepository.findByEmail(email).get();
        Optional<WishLists> wishLists = wishRepository.findByUserAndUid(user,wishUidDto.getWish_uid());
        if(!wishLists.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("잘못된 접근");
            return responseDto;
        }
        wishRepository.delete(wishLists.get());
        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("삭제 성공");
        return responseDto;
    }
}
