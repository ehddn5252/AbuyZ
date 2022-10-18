package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.LoginType;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ResponseDto siginUp(UserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Users user = userDto.toEntity(LoginType.ITDA);
        userRepository.save(user);
        ResponseDto responseDto = new ResponseDto(null,"회원가입 완료");
        return responseDto;
    }
}
