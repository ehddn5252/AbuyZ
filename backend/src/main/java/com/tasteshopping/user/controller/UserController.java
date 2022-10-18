package com.tasteshopping.user.controller;

import com.tasteshopping.user.dto.LoginDto;
import com.tasteshopping.user.dto.PasswordChangeDto;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;
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

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> signup(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.siginUp(userDto), HttpStatus.OK);
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
}
