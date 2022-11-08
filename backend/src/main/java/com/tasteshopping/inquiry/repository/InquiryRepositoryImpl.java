package com.tasteshopping.inquiry.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import com.tasteshopping.inquiry.dto.FilteredDto;
import com.tasteshopping.inquiry.dto.QFilteredDto;
import com.tasteshopping.inquiry.dto.SearchCondition;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.tasteshopping.inquiry.entity.QCustomerCenters.*;
import static com.tasteshopping.user.entity.QUsers.*;


@Repository
@RequiredArgsConstructor
@Slf4j
public class InquiryRepositoryImpl {

    private final JPAQueryFactory factory;

    public List<FilteredDto> filterSearch(SearchCondition searchCondition){
        log.warn(searchCondition.toString());

        BooleanBuilder builder = new BooleanBuilder();
        if(searchCondition.getTitle() != null){
            searchCondition.setTitle("%"+searchCondition.getTitle()+"%");
            builder.and(customerCenters.title.like(searchCondition.getTitle()));
        }
        if(searchCondition.getStatus() != null){
            builder.and(customerCenters.status.eq(searchCondition.getStatus()));
        }
        if(searchCondition.getCustomerCenterCategory() != null){
            builder.and(customerCenters.customerCenterCategory.eq(searchCondition.getCustomerCenterCategory()));
        }

        return factory.select(new QFilteredDto(customerCenters.status,customerCenters.customerCenterCategory,
                        customerCenters.title,customerCenters.content,customerCenters.start_date,customerCenters.end_date,
                        users.name))
                .from(customerCenters)
                .join(customerCenters.user, users)
                .where(builder)
                .where(customerCenters.start_date.between(searchCondition.getStart_date(),searchCondition.getEnd_date()))
                .orderBy(customerCenters.start_date.asc())
                .fetch();
    }

}