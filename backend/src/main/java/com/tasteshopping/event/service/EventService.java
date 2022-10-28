package com.tasteshopping.event.service;

import com.tasteshopping.event.dto.EventReqDto;
import com.tasteshopping.user.dto.ResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface EventService {
    ResponseDto create(String email, MultipartFile thumbnail,
                       MultipartFile content_img, EventReqDto eventDto);
    ResponseDto getEventList(String email);
    ResponseDto deleteEvent(String email,int event_uid);
    ResponseDto modifyEvent(String email,int event_uid,MultipartFile thumbnail,
                            MultipartFile content_img, EventReqDto eventDto);
}
