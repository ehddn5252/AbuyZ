package com.tasteshopping.user.entity;

import com.tasteshopping.user.dto.UserAddressDto;
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
public class UserAddresses {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int uid;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String detailAddress;

    @Column
    private String postalCode;

    @Column(nullable = false)
    private String recipient;

    @Column
    private String contact;

    public void update(UserAddressDto userAddress){
        this.address = userAddress.getAddress();
        this.detailAddress = userAddress.getDetailAddress();
        this.contact = userAddress.getContact();
        this.postalCode = userAddress.getPostalCode();
        this.recipient = userAddress.getRecipient();
    }
    public UserAddressDto toDto(){

        return UserAddressDto.builder()
                .uid(this.uid)
                .address(this.address)
                .detailAddress(this.detailAddress)
                .contact(this.contact)
                .postalCode(this.postalCode)
                .recipient(this.recipient)
                .build();
    }
}
