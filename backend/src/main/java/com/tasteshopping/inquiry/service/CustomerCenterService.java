package com.tasteshopping.inquiry.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;

import java.util.List;

public interface CustomerCenterService {
    List<CustomerCenterDto> getMyCustomerCenter(String email);

    List<CustomerCenterDto> getCustomerCenter();
    CustomerCenterDto getCustomerCenterByUid(Integer uid);
    public void modifyCustomerCenterByUid(Integer uid, CustomerCenterWriteReqDto customerCenterWriteReqDto);

    void deleteCustomerCenterByUidSameEmail(Integer uid, String email);

    BaseRes deleteCustomerCenterReplyByUid(Integer uid, String email);

    public void deleteCustomerCenterByUid(Integer uid);
    public BaseRes createCustomerCenterByUid(String email, CustomerCenterWriteReqDto customerCenterWriteReqDto);

    BaseRes writeReplyCustomerCenter(String email, int parentUid, String content);
}