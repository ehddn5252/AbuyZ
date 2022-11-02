package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;

public interface SocialUserService {
    UserDto getUserInfoByAccessToken(String access_token);
    UserDto StringToDto(String access_token);
    ResponseDto login(String access_token);
}
