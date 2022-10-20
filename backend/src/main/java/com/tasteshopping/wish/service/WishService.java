package com.tasteshopping.wish.service;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.wish.dto.WishReqDto;

public interface WishService {
    ResponseDto getWishList(String email);
    ResponseDto wish(WishReqDto wishReqDto);
    ResponseDto cancel(String email, Integer wish_id);
}
