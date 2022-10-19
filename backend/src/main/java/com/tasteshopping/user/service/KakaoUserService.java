package com.tasteshopping.user.service;

import com.tasteshopping.user.dto.LoginDto;
import com.tasteshopping.user.dto.LoginType;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.UserDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoUserService implements SocialUserService{

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public ResponseDto login(String access_token) {
        UserDto userDto = getUserInfoByAccessToken(access_token);
        LoginDto loginDto = new LoginDto(userDto.getEmail(),userDto.getPassword());
        return userService.login(loginDto);
    }

    @Override
    @Transactional
    public UserDto getUserInfoByAccessToken(String access_token) {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        String result = "";
        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            // 전송할 header 작성
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + access_token);
            conn.setRequestProperty("charset", "UTF-8");

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = br.readLine()) != null) {
                result += line;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        UserDto userDto = StringToDto(result);

        Optional<Users> user = userRepository.findByEmail(userDto.getEmail());
        // 일치하는 회원 X -> 가입
        if (!user.isPresent()) {
            userService.signUp(userDto, LoginType.KAKAO);
        }
        return userDto;
    }

    @Override
    public UserDto StringToDto(String UserInfoString) {
        UserDto userDto = new UserDto();
        try {
            // JSON 파싱
            JSONParser parser = new JSONParser();
            JSONObject jsonObj = (JSONObject) parser.parse(UserInfoString);

            JSONObject kakao_account = (JSONObject) jsonObj.get("kakao_account");
            JSONObject profile = (JSONObject) kakao_account.get("profile");

            String email = jsonObj.get("id").toString()+"KAKAO";
            userDto.setEmail(email);
            userDto.setPassword(jsonObj.get("id").toString());
            String nickname;
            String temp_nickname = UUID.randomUUID().toString().replaceAll("-", "");
            temp_nickname = "User"+temp_nickname.substring(0, 10);
            nickname=(String)profile.getOrDefault("nickname",temp_nickname);
            userDto.setNickname(nickname);
            userDto.setName(nickname);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return userDto;
    }
}
