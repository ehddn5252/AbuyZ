package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;

public interface UserService {
    ResponseDto siginUp(UserDto userDto);
}
