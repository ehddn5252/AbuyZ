package com.tasteshopping.inquiry.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class InquiryRepositoryImpl {

    private final JPAQueryFactory factory;

    public void select(){

    }
}