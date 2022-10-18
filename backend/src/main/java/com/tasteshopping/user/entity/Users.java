package com.tasteshopping.user.entity;

import com.tasteshopping.user.dto.LoginType;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int uid;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String address;

    @Column
    private String detailAddress;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String gender;

    @Column
    private String birth;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private int mileage;

    @Column(nullable = false)
    private int status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoginType loginType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role userRoles;

    public void updateStatus(){
        this.status = 1;
    }
    public void updatepassword(String password){
        this.password = password;
    }
    public UserDto toDto(){
        return UserDto.builder()
                .email(this.email)
                .password(this.password)
                .address(this.address)
                .detailAddress(this.detailAddress)
                .phoneNumber(this.phoneNumber)
                .name(this.name)
                .gender(this.gender)
                .birth(this.birth)
                .nickname(this.nickname)
                .mileage(this.mileage)
                .status(this.status)
                .loginType(this.loginType.toString())
                .role(this.userRoles.toString())
                .build();
    }
}