package com.tasteshopping.statistics.service;

import com.tasteshopping.statistics.dto.DateDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface StatisticsService {
    ResponseDto getSales(String email, DateDto dateDto);
    ResponseDto getCart(String email);
    ResponseDto getProduct(String email, DateDto dateDto);
    ResponseDto getCategory(String email, DateDto dateDto);
    ResponseDto getDaily(String email, DateDto dateDto);
}
