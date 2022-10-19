package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.*;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.user.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;

    @Override
    @Transactional
    public ResponseDto signUp(UserDto userDto, LoginType loginType) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Users user = userDto.toEntity(loginType);
        userRepository.save(user);
        ResponseDto responseDto = new ResponseDto(new ResultDto(true),"회원가입 완료");
        return responseDto;
    }

    @Override
    public ResponseDto login(LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        TokenDto tokenDto = new TokenDto(tokenProvider.createToken(authentication));
        ResponseDto responseDto = new ResponseDto(tokenDto,"로그인 성공");

        return responseDto;
    }
    @Override
    @Transactional
    public ResponseDto withdrawal(String email) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        ResultDto resultDto = new ResultDto();
        ResponseDto responseDto = new ResponseDto();
        if(!findUser.isPresent() || findUser.get().getStatus()==1){
            resultDto.setResult(false);
            responseDto.setMessage("탈퇴 실패");
        }else{
            Users user = findUser.get();
            user.updateStatus();
            userRepository.save(user);
            resultDto.setResult(true);
            responseDto.setMessage("탈퇴 성공.");
        }
        responseDto.setData(resultDto);
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto changePassword(String email, PasswordChangeDto passwordChangeDto) {
        ResponseDto responseDto;

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, passwordChangeDto.getPassword());
        authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        if(authenticationToken==null){
            responseDto = new ResponseDto(new ResultDto(false),"기존 비밀번호가 틀림");
        }else{
            Optional<Users> findUser = userRepository.findByEmail(email);
            findUser.get().updatepassword(passwordEncoder.encode(passwordChangeDto.getNew_password()));
            userRepository.save(findUser.get());
            responseDto = new ResponseDto(new ResultDto(true),"비밀 번호 변경 완료");
        }
        return responseDto;
    }

    @Override
    public ResponseDto checkEmail(String email) {
        ResponseDto responseDto;
        if (userRepository.findByEmail(email).orElse(null) != null) {
            responseDto = new ResponseDto(new ResultDto(false),"이미 존재하는 이메일입니다.");
        }else{
            responseDto = new ResponseDto(new ResultDto(true),"사용가능한 이메일입니다.");
        }
        return responseDto;
    }

    @Override
    public ResponseDto checkNickname(String nickname) {
        ResponseDto responseDto;
        if (userRepository.findByNickname(nickname).orElse(null) != null) {
            responseDto = new ResponseDto(new ResultDto(false),"이미 존재하는 닉네임입니다.");
        }else{
            responseDto = new ResponseDto(new ResultDto(true),"사용가능한 닉네임입니다.");
        }
        return responseDto;
    }

    @Override
    public ResponseDto sendEmail(String email) {
        return null;
    }

    @Override
    public ResponseDto authenticationNumber(String authentication_number) {
        return null;
    }

    @Override
    public ResponseDto sendTempPassword(String email, String name) {
        return null;
    }

    @Override
    public ResponseDto getInfo(String email) {
        Users user = userRepository.findByEmail(email).get();
        UserDto userDto = user.toDto();
        ResponseDto responseDto = new ResponseDto(userDto,"회원 정보 조회 성공");
        return responseDto;
    }
    
    @Override
    @Transactional
    public ResponseDto changeInfo(String email, UserModificationDto userModificationDto) {
        Users user = userRepository.findByEmail(email).get();
        user.modifyInfo(userModificationDto);
        userRepository.save(user);
        ResponseDto responseDto = new ResponseDto(new ResultDto(true),"회원 정보 수정 성공");
        return responseDto;
    }
}
