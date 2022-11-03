package com.tasteshopping.statistics.service;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
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
    private final CartRepository cartRepository;
    private final OrderListRepository orderListRepository;
    private final OrderRepository orderRepository;
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
    public ResponseDto getPercentage(String email, DateDto dateDto) {
        return getStatistics(email,dateDto,3);
    }

    @Override
    public ResponseDto getDaily(String email, DateDto dateDto) {
        return getStatistics(email,dateDto,4);
    }

    public ResponseDto getStatistics(String email, DateDto dateDto, int menu){
        Optional<Users> users = userRepository.findByEmail(email);
        ResponseDto responseDto = new ResponseDto();
        List<OrderLists> orderLists;
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
                int total_count=0,total_sales=0;
                orderLists = orderListRepository.findByDateBetween(start_date,end_date);
                HashMap<String,Integer> result = new HashMap<>();
                for(OrderLists orderList:orderLists){
                    total_sales+=orderList.getTotalPrice();
                    for(Orders order:orderList.getOrders()){
                        total_count+=order.getCount();
                    }
                    result.put(orderList.getDate().toString(),
                            result.getOrDefault(orderList.getDate().toString(),0)+orderList.getTotalPrice());
                }

                Map<String,Object>map = new HashMap<>();
                map.put("revenues",result);
                map.put("total_count",total_count);
                map.put("total_sales",total_sales);

                responseDto.setData(map);
                responseDto.setMessage("조회 성공");
                break;
            case 1:
                CartStatisticsListDto cartStatisticsListDto = new CartStatisticsListDto();
                List<Carts>carts = cartRepository.findAll();
                for(Carts cart:carts){
                    String big_category_name = cart.getInventory().getProduct().
                                                getSmallCategory().getBigCategory()
                                                .getCategoryName();

                    String small_category_name = cart.getInventory().getProduct().
                                                    getSmallCategory().getSmallCategoryName();

                    CartBigCategoryDto cartBigCategoryDto = cartStatisticsListDto.getBig_category()
                            .getOrDefault(big_category_name,new CartBigCategoryDto(new TreeMap<>(),0));

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
            case 2:case 3:
                List<Orders>orders = orderRepository.findAllByDateBetween(start_date,end_date);
                //상품별 통계 -> 정렬 X
                if(menu==2){
                    TreeMap<String,ProductStatisticsDto>productStatistics=new TreeMap<>();
                    for(Orders order:orders){
                        ProductStatisticsDto productStatisticsDto = productStatistics.getOrDefault(order.getInventory().getProduct().getName(),
                                new ProductStatisticsDto(order.getInventory().getProduct().getSmallCategory().getBigCategory().getCategoryName(),
                                        order.getInventory().getProduct().getSmallCategory().getSmallCategoryName()));

                        productStatisticsDto.updateCount(order.getCount());
                        productStatisticsDto.updateSalesAmount(order.getPrice());
                    }
                    responseDto.setData(productStatistics);
                }
                else{
                    PercentStatisticsListDto percentStatistics = new PercentStatisticsListDto(new TreeMap<>(),0);
                    for(Orders order:orders){
                        percentStatistics.updateTotalSales(order.getCount()*order.getPrice());

                        String big_category_name = order.getInventory().getProduct().
                                getSmallCategory().getBigCategory()
                                .getCategoryName();

                        String small_category_name = order.getInventory().getProduct().
                                getSmallCategory().getSmallCategoryName();

                        BigCategoryPercentDto bigCategoryPercentDto = percentStatistics.getBig_category()
                                .getOrDefault(big_category_name,new BigCategoryPercentDto(new TreeMap<>(),0,0));
                        bigCategoryPercentDto.updateTotalSales(order.getCount()*order.getPrice());

                        SmallCategoryPercentDto smallCategoryPercentDto = bigCategoryPercentDto.getSmall_category()
                                .getOrDefault(small_category_name,new SmallCategoryPercentDto(0,0));
                        smallCategoryPercentDto.updateTotalSales(order.getCount()*order.getPrice());
                    }
                    for(String big_category_name :percentStatistics.getBig_category().keySet()){
                        BigCategoryPercentDto bigCategoryPercentDto = percentStatistics.getBig_category().get(big_category_name);
                        double percent = (double) bigCategoryPercentDto.getTotal_sales()
                                        / (double) percentStatistics.getTotal_sales()
                                        * 100;
                        bigCategoryPercentDto.setPercent(Math.round(percent*10)/10.0);
                        for(String small_category_name:bigCategoryPercentDto.getSmall_category().keySet()){
                            SmallCategoryPercentDto smallCategoryPercentDto = bigCategoryPercentDto.getSmall_category().get(small_category_name);
                            percent = (double) smallCategoryPercentDto.getTotal_sales()
                                    / (double) bigCategoryPercentDto.getTotal_sales()
                                    * 100;
                            smallCategoryPercentDto.setPercent(Math.round(percent*10)/10.0);
                        }
                    }
                    responseDto.setData(percentStatistics);
                }
                responseDto.setMessage("조회 성공");
                break;
                //요일별 통계 -> 정렬 X
            default:
                Map<String,Integer>dayStatistics = new HashMap<>();
                orderLists = orderListRepository.findAllByDateBetween(start_date,end_date);
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
