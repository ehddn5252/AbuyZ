package com.tasteshopping.wish.service;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.wish.dto.WishListDto;
import com.tasteshopping.wish.dto.WishReqDto;
import com.tasteshopping.wish.entity.WishLists;
import com.tasteshopping.wish.repository.WishRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class WishServiceImpl implements WishService {
    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    @Override
    public ResponseDto getWishList(String email) {
        ResponseDto responseDto = new ResponseDto();
        Optional<Users> user = userRepository.findByEmail(email);
        List<WishLists> result = wishRepository.findByUser(user);

        WishListDto listDto = new WishListDto(new ArrayList<>(),0);

        for(WishLists wish:result){
            listDto.getProducts().add(wish.toWishProductDto());
            listDto.upProductCount();
        }

        if(listDto.getProducts_count()==0){
            responseDto.setMessage("찜 한 것이 없음");
        }else{
            responseDto.setData(listDto);
        }

        return responseDto;
    }

    @Override
    public ResponseDto wish(WishReqDto wishReqDto) {
        return null;
    }

    @Override
    public ResponseDto cancel(String email, Integer wish_id) {
        return null;
    }
}
