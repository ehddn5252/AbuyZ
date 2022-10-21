package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.*;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.user.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final JavaMailSenderImpl mailSender;

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
            findUser.get().updatePassword(passwordEncoder.encode(passwordChangeDto.getNew_password()));
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
    public ResponseDto sendCertificationNumber(String email) {
        ResponseDto responseDto = new ResponseDto();
        Random rand = new Random();
        String authNumber = String.valueOf(rand.nextInt(999999));

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        String setFrom = "wlgns3914@naver.com";
        String toMail = email;
        String title = "회원 가입 인증 이메일 입니다.";
        String content = "BUYZ를 방문해주셔서 감사합니다." +
                "<br><br>" +
                "인증 번호는 " + authNumber + "입니다." +
                "<br>" +
                "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
        try {
            mimeMessageHelper.setFrom(setFrom);
            mimeMessageHelper.setTo(toMail);
            mimeMessageHelper.setSubject(title);
            mimeMessageHelper.setText(content, true);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("이메일 전송에 실패했습니다.");
            return responseDto;
        }
        // 5분 동안만 인증번호 저장
//        redisUtil.setDataExpire(email, authNumber, 60 * 5L);
        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("인증 번호를 전송 완료");
        return responseDto;
    }

    @Override
    public ResponseDto authenticationNumber(AuthenticationNumberDto authenticationNumberDto) {
        ResponseDto responseDto = new ResponseDto();
//        if (!redisUtil.getData(email).equals(authNum)) {
//            responseDto.setData(new ResultDto(false));
//            responseDto.setMessage("불일치");
//        }
        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("일치");
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto sendTempPassword(CheckUserInfoDto checkUserInfoDto) {
        ResponseDto responseDto = new ResponseDto();
        Optional<Users> user = userRepository.findByEmail(checkUserInfoDto.getEmail());
        if(!user.isPresent() || !user.get().getName().equals(checkUserInfoDto.getName())){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("일치하는 계정이 없습니다.");
            return responseDto;
        }
        String temp_pw = UUID.randomUUID().toString().replaceAll("-", "");
        temp_pw = temp_pw.substring(0, 10);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        String setFrom = "wlgns3914@naver.com";
        String toMail = checkUserInfoDto.getEmail();
        String title = "임시 비밀번호 발급 이메일 입니다.";
        String content = "BUYZ를 방문해주셔서 감사합니다." +
                "<br><br>" +
                "임시 비밀번호는 "+ temp_pw  + "입니다." +
                "<br>" +
                "해당 비밀번호로 로그인해주세요.";
        try {
            mimeMessageHelper.setFrom(setFrom);
            mimeMessageHelper.setTo(toMail);
            mimeMessageHelper.setSubject(title);
            mimeMessageHelper.setText(content, true);
            mailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("이메일 전송에 실패했습니다.");
            return responseDto;
        }
        user.get().updatePassword(passwordEncoder.encode(temp_pw));
        userRepository.save(user.get());

        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("임시 비밀번호 발급 완료");
        return responseDto;
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
