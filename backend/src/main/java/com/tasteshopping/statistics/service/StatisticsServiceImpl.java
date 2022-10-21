package com.tasteshopping.statistics.service;

import com.tasteshopping.order.entity.Revenues;
import com.tasteshopping.order.repository.RevenueRepository;
import com.tasteshopping.statistics.dto.DateDto;
import com.tasteshopping.statistics.dto.TotalSaleDto;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final UserRepository userRepository;
    private final RevenueRepository revenueRepository;
    @Override
    public ResponseDto getSales(String email, DateDto dateDto) {
        ResponseDto responseDto = new ResponseDto();
        if(!check(email)){
            responseDto.setMessage("권한 없음");
            return responseDto;
        }
        Date start_date = null;
        Date end_date = null;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            start_date = formatter.parse(dateDto.getStart_date());
            end_date = formatter.parse(dateDto.getEnd_date());
        } catch (ParseException e) {
            e.printStackTrace();
            responseDto.setMessage("추가 실패 : 잘못된 날짜양식");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        int total=0;
        List<Revenues> result = revenueRepository.findAllByDateBetween(start_date,end_date);
        for(Revenues revenues:result){
            total+=revenues.getDailyRevenue();
        }
        responseDto.setData(new TotalSaleDto(total));
        responseDto.setMessage("조회 성공");
        return responseDto;
    }
    public boolean check(String email){
        Optional<Users> users = userRepository.findByEmail(email);
        if(!users.isPresent()||users.get().getUserRoles()!= Role.ADMIN){
            return false;
        }
        return true;
    }
}
