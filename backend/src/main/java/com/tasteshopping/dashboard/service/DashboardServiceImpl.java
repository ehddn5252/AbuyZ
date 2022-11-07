package com.tasteshopping.dashboard.service;

import com.tasteshopping.review.dto.ReviewDto;
import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.repository.ReportRepository;
import com.tasteshopping.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ReviewRepository reviewRepository;

    private final ReportRepository reportRepository;
    @Override
    public List<ReviewDto> getReviews() {
        List<Reviews> l = reviewRepository.findCurrent();
        List<ReviewDto> reviewDtos = new ArrayList<>();
        int size=2;
        if(l.size()<2){
            size=l.size();
        }
        for(int i=0;i<size;++i){
            reviewDtos.add(l.get(i).toDto());
        }
        return reviewDtos;
    }

    @Override
    public Integer getReportNum(){
        List<Reports> l = reportRepository.findAll();
        return l.size();
    }

    @Override
    public int getNoReplyNum() {
        // 답글이 아닌 친구를 가져오고
        List<Reviews> reviewList = reviewRepository.findByParentReviewIsNull();
        List<Reviews> replyList = reviewRepository.findByParentReviewIsNotNull();
        int noReplyCount = reviewList.size();
        for(int i=0;i<reviewList.size();++i){
            for(int j=0;j<replyList.size();++j){
                if (reviewList.get(i).getUid()==replyList.get(j).getParentReview().getUid()){
                    noReplyCount -=1;
                    break;
                }
            }
        }
        // 답글인 친구를 가져온다. 답글인 친구들의 parent uid 들을 가져오고 만약에 그 것들의
        return noReplyCount;
    }
}
