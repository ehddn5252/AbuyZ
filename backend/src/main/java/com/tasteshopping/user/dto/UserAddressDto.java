package com.tasteshopping.user.dto;

import com.tasteshopping.user.entity.UserAddresses;
import lombok.*;


@Data
@Builder
public class UserAddressDto {
    private int uid;
    private String nickname;
    private String address;
    private String detailAddress;
    private String postalCode;
    private String recipient;
    private String contact1;
    private String contact2;
    private String note;

    public UserAddresses toDto(){
        return UserAddresses.builder()
                .nickname(this.nickname)
                .address(this.address)
                .detailAddress(this.detailAddress)
                .postalCode(this.postalCode)
                .recipient(this.recipient)
                .contact1(this.contact1)
                .contact2(this.contact2)
                .note(this.note)
                .build();
    }
}
