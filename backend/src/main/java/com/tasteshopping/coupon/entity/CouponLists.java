package com.tasteshopping.coupon.entity;

import com.tasteshopping.coupon.dto.CouponResDto;
import com.tasteshopping.coupon.dto.CouponStatus;
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
        String status = "";
        switch (this.status){
            case 0:
                status = CouponStatus.사용가능.toString();
                break;
            case 1:
                status = CouponStatus.사용.toString();
                break;
            case 2:
                status = CouponStatus.만료.toString();
                break;
        }
        return CouponResDto.builder()
                .uid(this.uid)
                .name(this.coupons.getName())
                .status(status)
                .discount_price(this.coupons.getDiscountPrice())
                .start_date(this.coupons.getStartDate().toString())
                .end_date(this.coupons.getEndDate().toString())
                .available_categories_uid(this.coupons.getBigCategories().getUid())
                .available_categories_name(this.coupons.getBigCategories().getCategoryName())
                .build();
    }
}
