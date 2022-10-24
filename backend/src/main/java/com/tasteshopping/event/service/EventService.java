package com.tasteshopping.event.service;

import com.tasteshopping.event.dto.EventDto;
import com.tasteshopping.user.dto.ResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface EventService {
    ResponseDto create(String email, MultipartFile thumbnail,
                       MultipartFile content_img,EventDto eventDto);
    ResponseDto getEventList(String email, Integer event_uid);
    ResponseDto deleteEvent(String email);
}
