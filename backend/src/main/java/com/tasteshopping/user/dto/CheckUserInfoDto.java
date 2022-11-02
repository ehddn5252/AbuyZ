package com.tasteshopping.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CheckUserInfoDto {
    private String name;
    private String email;
}
