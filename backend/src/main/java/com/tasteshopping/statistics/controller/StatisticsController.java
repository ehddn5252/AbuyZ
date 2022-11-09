package com.tasteshopping.statistics.controller;

import com.tasteshopping.statistics.dto.DateDto;
import com.tasteshopping.statistics.service.StatisticsServiceImpl;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsServiceImpl statisticsService;
    @PostMapping("/sales")
    public ResponseEntity<ResponseDto>getSales(@RequestBody DateDto dateDto){
        return new ResponseEntity<>(statisticsService.getSales(dateDto), HttpStatus.OK);
    }
    @GetMapping("/cart")
    public ResponseEntity<ResponseDto>getCart(){
        return new ResponseEntity<>(statisticsService.getCart(), HttpStatus.OK);
    }
    @PostMapping("/daily")
    public ResponseEntity<ResponseDto>getDaily(@RequestBody DateDto dateDto){
        return new ResponseEntity<>(statisticsService.getDaily(dateDto), HttpStatus.OK);
    }
    @PostMapping("/category-percentage")
    public ResponseEntity<ResponseDto>getPercentage(@RequestBody DateDto dateDto){
        return new ResponseEntity<>(statisticsService.getPercentage(dateDto), HttpStatus.OK);
    }
    @PostMapping("/product")
    public ResponseEntity<ResponseDto>getProduct(@RequestBody DateDto dateDto){
        return new ResponseEntity<>(statisticsService.getProduct(dateDto), HttpStatus.OK);
    }
}
