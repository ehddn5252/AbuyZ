package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.LoginDto;
import com.tasteshopping.user.dto.PasswordChangeDto;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;

public interface UserService {
    ResponseDto siginUp(UserDto userDto);
    ResponseDto login(LoginDto loginDto);
    ResponseDto withdrawal(String email);
    ResponseDto changePassword(String email, PasswordChangeDto passwordChangeDto);
    ResponseDto checkEmail(String email);
    ResponseDto checkNickname(String nickname);
    ResponseDto sendEmail(String email);
    ResponseDto authenticationNumber(String authentication_number);
    ResponseDto kakaoLogin(String access_token);
    ResponseDto sendTempPassword(String email,String name);
    ResponseDto getInfo(String email);
    ResponseDto changeInfo();

}
