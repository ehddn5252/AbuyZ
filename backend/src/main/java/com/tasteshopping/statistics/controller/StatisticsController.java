package com.tasteshopping.statistics.controller;

import com.tasteshopping.statistics.dto.DateDto;
import com.tasteshopping.statistics.service.StatisticsServiceImpl;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsServiceImpl statisticsService;
    @PostMapping("/sales")
    public ResponseEntity<ResponseDto>getSales(@AuthenticationPrincipal String email,
                                               @RequestBody DateDto dateDto){
        return new ResponseEntity<>(statisticsService.getSales(email,dateDto), HttpStatus.OK);
    }

}
