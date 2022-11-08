package com.tasteshopping.inquiry.repository;

import com.tasteshopping.inquiry.dto.SearchCondition;
import com.tasteshopping.inquiry.entity.CustomerCenters;

import java.util.List;

public interface InquiryRepository {
    public List<CustomerCenters> search(SearchCondition searchCondition);
}
