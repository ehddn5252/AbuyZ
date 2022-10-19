package com.tasteshopping.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserModificationDto {
    private String address;
    private String detailAddress;
    private String phoneNumber;
    private String name;
    private String gender;
    private String birth;
    private String nickname;
}
