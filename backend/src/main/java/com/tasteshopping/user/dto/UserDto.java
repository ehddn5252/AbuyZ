package com.tasteshopping.user.dto;

import com.tasteshopping.user.entity.Users;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String email;
    private String password;
    private String address;
    private String detailAddress;
    private String phoneNumber;
    private String name;
    private String gender;
    private String birth;
    private String nickname;
    private int mileage;
    private int status;
    private String loginType;
    private String role;

    public Users toEntity(LoginType loginType){

        return Users.builder()
                .email(this.email)
                .password(this.password)
                .name(this.name)
                .nickname(this.nickname)
                .phoneNumber(this.phoneNumber)
                .gender(this.gender)
                .birth(this.birth)
                .mileage(this.mileage)
                .status(this.status)
                .loginType(loginType)
                .userRoles(Role.USER)
                .build();

    }
}
