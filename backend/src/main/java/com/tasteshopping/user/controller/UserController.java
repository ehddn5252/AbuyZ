package com.tasteshopping.user.controller;

import com.tasteshopping.user.dto.*;
import com.tasteshopping.user.service.KakaoUserService;
import com.tasteshopping.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;
    private final KakaoUserService kakaoUserService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> signUp(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.signUp(userDto,LoginType.BUYZ), HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestBody LoginDto loginDto) {
        return new ResponseEntity<>(userService.login(loginDto), HttpStatus.OK);
    }
    @PutMapping("/withdrawal")
    public ResponseEntity<ResponseDto> withdrawal(@AuthenticationPrincipal String email) {
        return new ResponseEntity<>(userService.withdrawal(email), HttpStatus.OK);
    }
    @GetMapping("/check-email/{email}")
    public ResponseEntity<ResponseDto>checkEmail(@PathVariable String email){
        return new ResponseEntity<>(userService.checkEmail(email), HttpStatus.OK);
    }
    @GetMapping("/check-nickname/{nickname}")
    public ResponseEntity<ResponseDto>checkNickname(@PathVariable String nickname){
        return new ResponseEntity<>(userService.checkNickname(nickname), HttpStatus.OK);
    }
    @PutMapping("/change-pw")
    public ResponseEntity<ResponseDto>checkNickname(@AuthenticationPrincipal String email,
                                                    @RequestBody PasswordChangeDto passwordChangeDto){
        return new ResponseEntity<>(userService.changePassword(email,passwordChangeDto), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<ResponseDto>getInfo(@AuthenticationPrincipal String email){
        return new ResponseEntity<>(userService.getInfo(email),HttpStatus.OK);
    }
    @PutMapping("/change-info")
    public ResponseEntity<ResponseDto>changeInfo(@AuthenticationPrincipal String email,
                                                 @RequestBody UserModificationDto userModificationDto){
        return new ResponseEntity<>(userService.changeInfo(email,userModificationDto), HttpStatus.OK);
    }
    @PostMapping("/kakao-login")
    public ResponseEntity<ResponseDto>kakaoLogin(@RequestBody TokenDto tokenDto){
        kakaoUserService.getUserInfoByAccessToken(tokenDto.getAccess_token());
        return new ResponseEntity<>(kakaoUserService.login(tokenDto.getAccess_token()),HttpStatus.OK);
    }
    @PostMapping("/find-pw")
    public ResponseEntity<ResponseDto>sendTempPassword(@RequestBody CheckUserInfoDto checkUserInfoDto){
        return new ResponseEntity<>(userService.sendTempPassword(checkUserInfoDto),HttpStatus.OK);
    }
    @GetMapping("/send-email/{email}")
    public ResponseEntity<ResponseDto>sendCertificationNumber (@PathVariable String email){
        return new ResponseEntity<>(userService.sendCertificationNumber(email),HttpStatus.OK);
    }
    @PostMapping("/authentication-email")
    public ResponseEntity<ResponseDto>sendCertificationNumber (@RequestBody AuthenticationNumberDto authenticationNumberDto){
        return new ResponseEntity<>(userService.authenticationNumber(authenticationNumberDto),HttpStatus.OK);
    }
}