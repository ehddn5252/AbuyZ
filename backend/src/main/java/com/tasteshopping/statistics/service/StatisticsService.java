package com.tasteshopping.statistics.service;

import com.tasteshopping.statistics.dto.DateDto;
import com.tasteshopping.user.dto.ResponseDto;

public interface StatisticsService {
    ResponseDto getSales(String email, DateDto dateDto);

}
