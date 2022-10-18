package com.tasteshopping.user.controller;

import com.tasteshopping.user.dto.LoginType;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;
import com.tasteshopping.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
