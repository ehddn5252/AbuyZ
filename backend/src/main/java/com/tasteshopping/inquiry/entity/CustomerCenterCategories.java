package com.tasteshopping.inquiry.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCenterCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name="name",nullable = false, columnDefinition = "varchar(40) default 'basic'")
    private String name;
}
