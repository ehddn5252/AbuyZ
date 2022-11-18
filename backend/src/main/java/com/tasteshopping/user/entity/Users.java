package com.tasteshopping.user.entity;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.coupon.entity.CouponLists;
import com.tasteshopping.user.dto.LoginType;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.dto.UserDto;
import com.tasteshopping.user.dto.UserModificationDto;
import com.tasteshopping.wish.entity.WishLists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private String phoneNumber;

    @Column(nullable = false)
    private String name;

    @Column
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WishLists> wishLists = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CouponLists> couponLists = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Carts> carts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserAddresses> userAddresses = new ArrayList<>();

    public void updateStatus(){
        this.status = 1;
    }

    public void updatePassword(String password){
        this.password = password;
    }

    public void modifyInfo(UserModificationDto userModificationDto){
        this.phoneNumber = userModificationDto.getPhoneNumber();
        this.name = userModificationDto.getName();
        this.gender = userModificationDto.getGender();
        this.birth = userModificationDto.getBirth();
        this.nickname = userModificationDto.getNickname();
    }
    public UserDto toDto(){
        return UserDto.builder()
                .email(this.email)
                .phoneNumber(this.phoneNumber)
                .name(this.name)
                .gender(this.gender)
                .birth(this.birth)
                .nickname(this.nickname)
                .mileage(this.mileage)
                .loginType(this.loginType.toString())
                .role(this.userRoles.toString())
                .status(this.status)
                .build();
    }
}