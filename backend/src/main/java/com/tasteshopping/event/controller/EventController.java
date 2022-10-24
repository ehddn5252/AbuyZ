package com.tasteshopping.event.controller;

import com.tasteshopping.event.dto.EventDto;
import com.tasteshopping.event.service.EventService;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createEvent(@AuthenticationPrincipal String email,
                                                   @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
                                                   @RequestPart(value = "content_img", required = false) MultipartFile content_img,
                                                   @RequestPart(value = "eventDto") EventDto eventDto){
        return new ResponseEntity<>(eventService.create(email, thumbnail,content_img,eventDto), HttpStatus.OK);
    }
    @GetMapping("/{event_uid}")
    public ResponseEntity<ResponseDto>getEventList(@AuthenticationPrincipal String email,
                                                   @PathVariable Integer event_uid){
        return new ResponseEntity<>(eventService.getEventList(email,event_uid),HttpStatus.OK);
    }
}