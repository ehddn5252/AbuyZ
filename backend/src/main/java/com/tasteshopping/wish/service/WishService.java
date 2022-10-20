package com.tasteshopping.wish.service;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.wish.dto.WishUidDto;

public interface WishService {
    ResponseDto getWishList(String email);
    ResponseDto wish(String email, String wishReqDto);
    ResponseDto cancel(String email, WishUidDto wishUidDto);
}
