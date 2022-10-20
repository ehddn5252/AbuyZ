package com.tasteshopping.wish.service;

import com.tasteshopping.user.dto.ResponseDto;

public interface WishService {
    ResponseDto getWishList(String email);
    ResponseDto wish(String email, String wishReqDto);
    ResponseDto cancel(String email, Integer wish_id);
}
