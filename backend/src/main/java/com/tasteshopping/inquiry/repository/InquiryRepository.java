package com.tasteshopping.inquiry.repository;

import com.tasteshopping.inquiry.entity.CustomerCenterCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<CustomerCenterCategories,Integer> {
}
