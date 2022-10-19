package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.*;

public interface UserService {
    ResponseDto signUp(UserDto userDto,LoginType loginType);
    ResponseDto login(LoginDto loginDto);
    ResponseDto withdrawal(String email);
    ResponseDto changePassword(String email, PasswordChangeDto passwordChangeDto);
    ResponseDto checkEmail(String email);
    ResponseDto checkNickname(String nickname);
    ResponseDto sendEmail(String email);
    ResponseDto authenticationNumber(String authentication_number);
    ResponseDto sendTempPassword(CheckUserInfoDto checkUserInfoDto);
    ResponseDto getInfo(String email);
    ResponseDto changeInfo(String email, UserModificationDto userModificationDto);

}
