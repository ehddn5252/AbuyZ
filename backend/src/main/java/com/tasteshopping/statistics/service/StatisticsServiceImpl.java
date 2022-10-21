package com.tasteshopping.statistics.service;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Revenues;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.RevenueRepository;
import com.tasteshopping.statistics.dto.*;
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
import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final UserRepository userRepository;
    private final RevenueRepository revenueRepository;
    private final CartRepository cartRepository;
    private final OrderListRepository orderListRepository;
    @Override
    public ResponseDto getSales(String email, DateDto dateDto) {
        return getStatistics(email,dateDto,0);
    }

    @Override
    public ResponseDto getCart(String email) {
        return getStatistics(email,null,1);
    }

    @Override
    public ResponseDto getProduct(String email, DateDto dateDto) {
        return getStatistics(email,dateDto,2);
    }

    @Override
    public ResponseDto getCategory(String email, DateDto dateDto) {
        return getStatistics(email,dateDto,3);
    }

    @Override
    public ResponseDto getDaily(String email, DateDto dateDto) {
        return getStatistics(email,dateDto,4);
    }

    public ResponseDto getStatistics(String email, DateDto dateDto, int menu){
        Optional<Users> users = userRepository.findByEmail(email);
        ResponseDto responseDto = new ResponseDto();
        if(!(users.isPresent() && users.get().getUserRoles() == Role.ADMIN)){
            responseDto.setMessage("권한 없음");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        int total=0;
        Date start_date=null;
        Date end_date=null;
        if(menu != 1){
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
        }

        switch (menu){
            case 0:
                List<Revenues> result = revenueRepository.findAllByDateBetween(start_date,end_date);
                for(Revenues revenues:result){
                    total+=revenues.getDailyRevenue();
                }
                responseDto.setData(new TotalSaleDto(total));
                responseDto.setMessage("조회 성공");
                break;
            case 1:
                CartStatisticsListDto cartStatisticsListDto = new CartStatisticsListDto();
                List<Carts>carts = cartRepository.findAll();
                for(Carts cart:carts){
                    String big_category_name = cart.getProduct().
                                                getSmallCategory().getBigCategory()
                                                .getCategoryName();

                    String small_category_name = cart.getProduct().
                                                    getSmallCategory().getSmallCategoryName();

                    CartBigCategoryDto cartBigCategoryDto = cartStatisticsListDto.getBig_category()
                            .getOrDefault(big_category_name,new CartBigCategoryDto(new HashMap<>(),0));

                    cartBigCategoryDto.updateCount(cart.getProductCount());

                    CartSmallCategoryDto cartSmallCategoryDto = cartBigCategoryDto.getSmall_category()
                            .getOrDefault(small_category_name,new CartSmallCategoryDto(small_category_name,0));
                    cartSmallCategoryDto.updateCount(cart.getProductCount());

                    total+=cart.getProductCount();
                }

                cartStatisticsListDto.setTotal_count(total);
                responseDto.setData(cartStatisticsListDto);
                responseDto.setMessage("조회 성공");
                break;
            case 2:

                break;
            case 3:
                break;
            default:
                Map<String,Integer>dayStatistics = new HashMap<>();
                List<OrderLists> orderLists = orderListRepository.findAllByDateBetween(start_date,end_date);
                for(OrderLists orderList:orderLists){
                    dayStatistics.put(orderList.getDay(), dayStatistics.getOrDefault(orderList.getDay(), 0) + orderList.getTotalPrice());
                }
                responseDto.setData(dayStatistics);
                responseDto.setMessage("조회 성공");
                break;
        }

        return responseDto;
    }
}
