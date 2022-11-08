package com.tasteshopping.wish.service;

import com.tasteshopping.user.dto.ResponseDto;
import org.springframework.data.domain.Pageable;

public interface WishService {
    ResponseDto getWishList(String email, Pageable Pageable);
    ResponseDto wish(String email, String wishReqDto);
    ResponseDto cancel(String email, int wish_uid);
}
