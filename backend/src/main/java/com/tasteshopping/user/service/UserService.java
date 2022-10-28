package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.*;

public interface UserService {
    ResponseDto signUp(UserDto userDto,LoginType loginType);
    ResponseDto login(LoginDto loginDto);
    ResponseDto withdrawal(String email);
    ResponseDto changePassword(String email, PasswordChangeDto passwordChangeDto);
    ResponseDto checkEmail(String email);
    ResponseDto checkNickname(String nickname);
    ResponseDto sendCertificationNumber(String email);
    ResponseDto authenticationNumber(AuthenticationDto authenticationDto);
    ResponseDto sendTempPassword(CheckUserInfoDto checkUserInfoDto);
    ResponseDto getInfo(String email);
    ResponseDto changeInfo(String email, UserModificationDto userModificationDto);
    ResponseDto addAddress(String email, UserAddressDto userAddressReqDto);
    ResponseDto getAddresses(String email);
    ResponseDto deleteAddress(String email,int address_uid);
    ResponseDto modifyAddress(String email, int address_uid, UserAddressDto userAddressReqDto);

}
