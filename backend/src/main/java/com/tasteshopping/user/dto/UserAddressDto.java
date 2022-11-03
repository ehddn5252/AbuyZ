package com.tasteshopping.user.dto;

import com.tasteshopping.user.entity.UserAddresses;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAddressDto {
    private int uid;
    private String address;
    private String detailAddress;
    private String postalCode;
    private String recipient;
    private String contact;

    public UserAddresses toDto(){
        return UserAddresses.builder()
                .address(this.address)
                .detailAddress(this.detailAddress)
                .postalCode(this.postalCode)
                .recipient(this.recipient)
                .contact(this.contact)
                .build();
    }
}
