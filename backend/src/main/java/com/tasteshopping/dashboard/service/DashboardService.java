package com.tasteshopping.dashboard.service;

import com.tasteshopping.review.dto.ReviewDto;
import com.tasteshopping.review.dto.ReviewResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface DashboardService {

   List<ReviewDto> getReviews();
   Integer getReportNum();

   int getNoReplyNum();
}
