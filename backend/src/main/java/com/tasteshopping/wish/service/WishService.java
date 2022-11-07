package com.tasteshopping.wish.service;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.wish.dto.WishUidDto;
import org.springframework.data.domain.Pageable;

public interface WishService {
    ResponseDto getWishList(String email, Pageable Pageable);
    ResponseDto wish(String email, String wishReqDto);
    ResponseDto cancel(String email, WishUidDto wishUidDto);
}
