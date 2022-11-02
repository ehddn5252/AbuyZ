package com.tasteshopping.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginDto {
    private String email;
    private String password;
}
