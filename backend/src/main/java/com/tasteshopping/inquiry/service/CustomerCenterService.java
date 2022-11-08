package com.tasteshopping.inquiry.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;
import com.tasteshopping.inquiry.dto.ReplyReqDto;
import com.tasteshopping.inquiry.dto.SearchCondition;
import com.tasteshopping.user.dto.ResponseDto;

import java.util.List;

public interface CustomerCenterService {

    Integer getNoReplyNum(String status);
    BaseRes getMyCustomerCenter(String email);

    List<CustomerCenterDto> getCurrent();

    List<CustomerCenterDto> getCustomerCenter();
    CustomerCenterDto getCustomerCenterByUid(Integer uid);
    BaseRes modifyCustomerCenterByUid(Integer uid, CustomerCenterWriteReqDto customerCenterWriteReqDto);

    BaseRes deleteCustomerCenterByUidSameEmail(Integer uid, String email);


    void deleteCustomerCenterByUid(Integer uid);
    BaseRes createCustomerCenterByUid(String email, CustomerCenterWriteReqDto customerCenterWriteReqDto);


    ResponseDto deleteReplyInquiry(int uid);

    ResponseDto writeReplyCustomerCenter(ReplyReqDto replyReqDto);
    ResponseDto search(SearchCondition searchCondition);
}
