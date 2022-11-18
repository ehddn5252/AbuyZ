package com.tasteshopping.event.controller;

import com.tasteshopping.event.dto.EventReqDto;
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
                                                   @RequestPart(value = "eventDto") EventReqDto eventDto){
        return new ResponseEntity<>(eventService.create(email, thumbnail,content_img,eventDto), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<ResponseDto>getEventList(){
        return new ResponseEntity<>(eventService.getEventList(),HttpStatus.OK);
    }
    @DeleteMapping("/{event_uid}")
    public ResponseEntity<ResponseDto>deleteEvent(@AuthenticationPrincipal String email,
                                                  @PathVariable int event_uid){
        return new ResponseEntity<>(eventService.deleteEvent(email, event_uid),HttpStatus.OK);
    }
    @PutMapping("/{event_uid}")
    public ResponseEntity<ResponseDto>modifyEvent(@AuthenticationPrincipal String email,
                                                  @PathVariable int event_uid,
                                                  @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
                                                  @RequestPart(value = "content_img", required = false) MultipartFile content_img,
                                                  @RequestPart(value = "eventDto") EventReqDto eventDto){
        return new ResponseEntity<>(eventService.modifyEvent(email,event_uid,thumbnail,content_img,eventDto),HttpStatus.OK);
    }
    @GetMapping("/detail/{event_uid}")
    public ResponseEntity<ResponseDto>getEventDetail(@PathVariable int event_uid){
        try {
            return new ResponseEntity<>(eventService.getEventDetail(event_uid),HttpStatus.OK);
        }
        catch (RuntimeException e){
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<ResponseDto>getAllEventList(){
        return new ResponseEntity<>(eventService.getAllEventList(),HttpStatus.OK);
    }
}