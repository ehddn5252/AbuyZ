package com.tasteshopping.coupon.entity;

import com.tasteshopping.coupon.dto.CouponResDto;
import com.tasteshopping.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponLists {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer uid;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "usersUid")
    private Users user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "couponsUid")
    private Coupons coupons;

    @Column(nullable = false)
    private int status;

    public void updateStatus(int status){
        this.status=status;
    }

    public CouponResDto toCouponsResDto(){
        return CouponResDto.builder()
                .uid(this.uid)
                .name(this.coupons.getName())
                .discount_price(this.coupons.getDiscountPrice())
                .start_date(this.coupons.getStartDate().toString())
                .end_date(this.coupons.getEndDate().toString())
                .status(this.status)
                .available_categories_uid(this.coupons.getBigCategories().getUid())
                .available_categories_name(this.coupons.getBigCategories().getCategoryName())
                .build();
    }
}
