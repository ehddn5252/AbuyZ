package com.tasteshopping.faq.service;

import com.tasteshopping.faq.dto.FAQDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface FAQService {
    ResponseDto createFAQ(FAQDto faqDto);
    ResponseDto modifyFAQ(FAQDto faqDto,int faq_uid);
    ResponseDto deleteFAQ(int uid);
    ResponseDto getFAQList();
}
