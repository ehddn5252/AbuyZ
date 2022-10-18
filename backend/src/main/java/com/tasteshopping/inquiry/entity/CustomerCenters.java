package com.tasteshopping.inquiry.entity;

import com.tasteshopping.user.entity.Users;

import javax.persistence.*;
import java.sql.Timestamp;
@Entity
public class CustomerCenters {
    @Id
    Integer uid;

    @Column(name = "title", columnDefinition = "varchar(50)")
    private String title;

    @Column(name = "content", columnDefinition = "varchar(500)")
    private String content;

    @Column(name = "status", nullable = false)
    private String status;
    @Column(name = "date", nullable = false)
    private Timestamp date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="customer_center_categories_uid")
    private CustomerCenterCategories customerCenterCategory;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="users_uid")
    private Users user;

//    // 부모 정의
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "CUSTOMER_CENTERS_UID")
//    private CustomerCenters parent;
//
//    // 자식 정의
//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "parent")
//    private CustomerCenters children;
}
