package com.tasteshopping.statistics.service;

import com.tasteshopping.statistics.dto.DateDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface StatisticsService {
    ResponseDto getSales(DateDto dateDto);
    ResponseDto getCart();
    ResponseDto getProduct(DateDto dateDto);
    ResponseDto getPercentage(DateDto dateDto);
    ResponseDto getDaily(DateDto dateDto);
}
