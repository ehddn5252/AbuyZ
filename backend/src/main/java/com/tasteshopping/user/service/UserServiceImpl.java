package com.tasteshopping.user.service;

import com.tasteshopping.common.service.RedisService;
import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.dashboard.service.DashboardService;
import com.tasteshopping.user.dto.*;
import com.tasteshopping.user.entity.UserAddresses;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserAddressRepository;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.user.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import javax.servlet.http.HttpServletRequest;
import java.util.*;

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
    private final UserAddressRepository userAddressRepository;
    private final RedisService redisService;

    private final DashboardService dashboardService;

    @Override
    @Transactional
    public ResponseDto signUp(UserDto userDto, LoginType loginType) {

        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Users user = userDto.toEntity(loginType);
        Users users = userRepository.save(user);

        if(userDto.getAddress()!=null){
            UserAddresses userAddresses = UserAddresses.builder()
                    .address(userDto.getAddress())
                    .detailAddress(userDto.getDetailAddress())
                    .recipient(userDto.getName())
                    .postalCode("")
                    .contact(userDto.getPhoneNumber())
                    .user(users)
                    .build();
            userAddressRepository.save(userAddresses);
        }

        dashboardService.doVisit(UtilService.getToday(),"register");

        ResponseDto responseDto = new ResponseDto(new ResultDto(true),"회원가입 완료",200);
        return responseDto;
    }

    @Override
    public ResponseDto login(LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

        redisService.setData(loginDto.getEmail(),refreshToken);

        TokenDto tokenDto = new TokenDto(accessToken,refreshToken,authentication.getAuthorities().toString());

        dashboardService.doVisit(UtilService.getToday(),"login");
        ResponseDto responseDto = new ResponseDto(tokenDto,"로그인 성공",200);

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
            responseDto = new ResponseDto(new ResultDto(false),"기존 비밀번호가 틀림",200);
        }else{
            Optional<Users> findUser = userRepository.findByEmail(email);
            findUser.get().updatePassword(passwordEncoder.encode(passwordChangeDto.getNew_password()));
            userRepository.save(findUser.get());
            responseDto = new ResponseDto(new ResultDto(true),"비밀 번호 변경 완료",200);
        }
        return responseDto;
    }

    @Override
    public ResponseDto checkEmail(String email) {
        ResponseDto responseDto;
        if (userRepository.findByEmail(email).orElse(null) != null) {
            responseDto = new ResponseDto(new ResultDto(false),"이미 존재하는 이메일입니다.",200);
        }else{
            responseDto = new ResponseDto(new ResultDto(true),"사용가능한 이메일입니다.",200);
        }
        return responseDto;
    }

    @Override
    public ResponseDto checkNickname(String nickname) {
        ResponseDto responseDto;
        if (userRepository.findByNickname(nickname).orElse(null) != null) {
            responseDto = new ResponseDto(new ResultDto(false),"이미 존재하는 닉네임입니다.",200);
        }else{
            responseDto = new ResponseDto(new ResultDto(true),"사용가능한 닉네임입니다.",200);
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
        String content = "ABUYZ를 방문해주셔서 감사합니다." +
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

        redisService.setDataExpire(email, authNumber, 60 * 10L);

        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("인증 번호를 전송 완료");
        return responseDto;
    }

    @Override
    public ResponseDto authenticationNumber(AuthenticationDto authenticationDto) {
        ResponseDto responseDto = new ResponseDto();
        System.out.println("기존 인증 번호"+redisService.getData(authenticationDto.getEmail()));
        System.out.println("확인 인증 번호"+authenticationDto.getCertification_number());
        if (!redisService.getData(authenticationDto.getEmail()).equals(authenticationDto.getCertification_number())) {
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("불일치");
            return responseDto;
        }
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
        String content = "ABUYZ를 방문해주셔서 감사합니다." +
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
        ResponseDto responseDto = new ResponseDto(userDto,"회원 정보 조회 성공",200);
        return responseDto;
    }
    
    @Override
    @Transactional
    public ResponseDto changeInfo(String email, UserModificationDto userModificationDto) {
        Users user = userRepository.findByEmail(email).get();
        user.modifyInfo(userModificationDto);
        userRepository.save(user);
        ResponseDto responseDto = new ResponseDto(new ResultDto(true),"회원 정보 수정 성공",200);
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto addAddress(String email, UserAddressDto userAddress) {
        ResponseDto responseDto = new ResponseDto();

        Optional<Users> user = userRepository.findByEmail(email);
        if(!user.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("추가 실패");
            return responseDto;
        }

        UserAddresses userAddresses = UserAddresses.builder()
                .address(userAddress.getAddress())
                .detailAddress(userAddress.getDetailAddress())
                .postalCode(userAddress.getPostalCode())
                .recipient(userAddress.getRecipient())
                .contact(userAddress.getContact())
                .user(user.get())
                .build();
        userAddressRepository.save(userAddresses);
        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("추가 성공");
        return responseDto;
    }

    @Override
    public ResponseDto getAddresses(String email) {
        ResponseDto responseDto = new ResponseDto();
        List<UserAddresses>findAddresses = userAddressRepository.findByUserEmail(email);
        List<UserAddressDto>userAddresses = new ArrayList<>();
        for(UserAddresses userAddress:findAddresses){
            userAddresses.add(userAddress.toDto());
        }
        responseDto.setData(userAddresses);
        responseDto.setMessage("조회 성공");
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto deleteAddress(String email, int address_uid) {
        ResponseDto responseDto = new ResponseDto();

        Optional<Users> user = userRepository.findByEmail(email);
        if(!user.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("삭제 실패");
            return responseDto;
        }
        Integer result = userAddressRepository.deleteByUidAndUser(address_uid,user.get());
        if(result==1){
            responseDto.setData(new ResultDto(true));
            responseDto.setMessage("삭제 성공");
        }else{
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("삭제 실패");
        }
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto modifyAddress(String email, int address_uid, UserAddressDto userAddressReqDto) {
        ResponseDto responseDto = new ResponseDto();

        Optional<UserAddresses> userAddresses = userAddressRepository.findByUidAndUserEmail(address_uid,email);

        if(!userAddresses.isPresent()){
            responseDto.setData(new ResultDto(false));
            responseDto.setMessage("수정 실패");
            return responseDto;
        }
        userAddresses.get().update(userAddressReqDto);
        userAddressRepository.save(userAddresses.get());

        responseDto.setData(new ResultDto(true));
        responseDto.setMessage("수정 성공");
        return responseDto;
    }
    @Override
    public ResponseDto getRefreshToken(HttpServletRequest request){

        String refreshToken = request.getHeader("refresh_token");

        if(!tokenProvider.validateToken(refreshToken)){
            throw new RuntimeException();
        }

        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        String email = authentication.getPrincipal().toString();
        String redisRefreshToken = redisService.getData(email);

        if(redisRefreshToken==null || !refreshToken.equals(redisRefreshToken)){
            throw new RuntimeException();
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String newAccessToken = tokenProvider.createAccessToken(authentication);
        String newRefreshToken = tokenProvider.createRefreshToken(authentication);
        TokenDto tokenDto = new TokenDto(newAccessToken,newRefreshToken,authentication.getAuthorities().toString());
        redisService.setData(email,newRefreshToken);
        ResponseDto responseDto = new ResponseDto(tokenDto,"재발급 성공",200);

        return responseDto;
    }
    @Override
    public void addBlackList(HttpServletRequest request){
        String accessToken = request.getHeader("access_token");
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        String email = authentication.getPrincipal().toString();
        redisService.deleteData(email);
        redisService.addElement("blacklist",accessToken);
    }
}
