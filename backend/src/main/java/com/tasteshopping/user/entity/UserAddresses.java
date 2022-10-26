package com.tasteshopping.user.entity;

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


}
