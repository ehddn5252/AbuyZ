package com.tasteshopping.faq.controller;

import com.tasteshopping.faq.dto.FAQDto;
import com.tasteshopping.faq.service.FAQService;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FAQController {
    private final FAQService faqService;
    @PostMapping("/create")
    public ResponseEntity<ResponseDto>createFAQ(@RequestBody FAQDto faqDto){
        return new ResponseEntity<>(faqService.createFAQ(faqDto),HttpStatus.OK);
    }
    @PutMapping("/{faq_uid}")
    public ResponseEntity<ResponseDto>modifyFAQ(@RequestBody FAQDto faqDto,
                                                @PathVariable int faq_uid){
        return new ResponseEntity<>(faqService.modifyFAQ(faqDto,faq_uid),HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<ResponseDto>modifyFAQ(){
        return new ResponseEntity<>(faqService.getFAQList(),HttpStatus.OK);
    }
    @DeleteMapping("/{faq_uid}")
    public ResponseEntity<ResponseDto>modifyFAQ(@PathVariable int faq_uid){
        return new ResponseEntity<>(faqService.deleteFAQ(faq_uid),HttpStatus.OK);
    }
}
