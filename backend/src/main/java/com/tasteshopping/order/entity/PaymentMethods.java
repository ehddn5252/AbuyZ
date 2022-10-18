package com.tasteshopping.order.entity;

import javax.persistence.*;

@Entity
public class PaymentMethods {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer uid;

    @Column(columnDefinition = "varchar(60) default 'base_payment_methods'")
    String name;
}
