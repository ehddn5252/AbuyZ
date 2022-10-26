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

    @Column
    private String nickname;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String detailAddress;

    @Column
    private String postalCode;

    @Column(nullable = false)
    private String recipient;

    @Column
    private String contact1;

    @Column
    private String contact2;

    @Column
    private String note;

    public void update(UserAddressDto userAddress){
        this.address = userAddress.getAddress();
        this.detailAddress = userAddress.getDetailAddress();
        this.contact1 = userAddress.getContact1();
        this.contact2 = userAddress.getContact2();
        this.nickname = userAddress.getNickname();
        this.note = userAddress.getNote();
        this.postalCode = userAddress.getPostalCode();
        this.recipient = userAddress.getRecipient();

    }
}
