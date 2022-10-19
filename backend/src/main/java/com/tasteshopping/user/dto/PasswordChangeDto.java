package com.tasteshopping.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class PasswordChangeDto {
    private String password;
    private String new_password;
}
