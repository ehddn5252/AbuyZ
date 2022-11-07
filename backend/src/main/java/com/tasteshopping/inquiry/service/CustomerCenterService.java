package com.tasteshopping.inquiry.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.dto.CCReportReqDto;
import com.tasteshopping.inquiry.dto.CCReportSelectReqDto;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;

import java.util.List;

public interface CustomerCenterService {

    Integer getNoReplyNum(String status);
    BaseRes getMyCustomerCenter(String email);

    List<CustomerCenterDto> getCurrent();

    List<CustomerCenterDto> getCustomerCenter();
    CustomerCenterDto getCustomerCenterByUid(Integer uid);
    BaseRes modifyCustomerCenterByUid(Integer uid, CustomerCenterWriteReqDto customerCenterWriteReqDto);

    BaseRes deleteCustomerCenterByUidSameEmail(Integer uid, String email);

    BaseRes deleteCustomerCenterReplyByUid(Integer uid, String email);

    void deleteCustomerCenterByUid(Integer uid);
    BaseRes createCustomerCenterByUid(String email, CustomerCenterWriteReqDto customerCenterWriteReqDto);

    BaseRes writeReplyCustomerCenter(String email, int parentUid, String content);
    /**
     * 고객센터 - 신고
     */
    BaseRes updateReportStatus(CCReportReqDto dto);
    BaseRes getReportList(CCReportSelectReqDto dto);
}
