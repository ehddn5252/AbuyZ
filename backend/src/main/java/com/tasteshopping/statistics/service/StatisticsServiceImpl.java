package com.tasteshopping.statistics.service;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.statistics.dto.*;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final CartRepository cartRepository;
    private final OrderListRepository orderListRepository;
    private final OrderRepository orderRepository;
    @Override
    public ResponseDto getSales(DateDto dateDto) {
        return getStatistics(dateDto,0);
    }

    @Override
    public ResponseDto getCart() {
        return getStatistics(null,1);
    }

    @Override
    public ResponseDto getProduct(DateDto dateDto) {
        return getStatistics(dateDto,2);
    }

    @Override
    public ResponseDto getPercentage(DateDto dateDto) {
        return getStatistics(dateDto,3);
    }

    @Override
    public ResponseDto getDaily(DateDto dateDto) {
        return getStatistics(dateDto,4);
    }

    public ResponseDto getStatistics(DateDto dateDto, int menu){
        ResponseDto responseDto = new ResponseDto();
        List<OrderLists> orderLists;
        Date start_date=null,end_date =null;
        int total=0;
        if(menu!=1){
            start_date=dateDto.getStart_date();
            end_date=dateDto.getEnd_date();
        }

        switch (menu){
            case 0:
                int total_count=0,total_sales=0;
                orderLists = orderListRepository.findByDateBetween(start_date,end_date);
                TreeMap<String,Integer> result = new TreeMap<>();
                for(OrderLists orderList:orderLists){
                    total_sales+=orderList.getTotalPrice();
                    for(Orders order:orderList.getOrders()){
                        total_count+=order.getCount();
                    }
                    String key = orderList.getDate().toString().split(" ")[0];
                    result.put(key,result.getOrDefault(key,0)+orderList.getTotalPrice());
                }

                Map<String,Object>map = new HashMap<>();
                map.put("revenues",result);
                map.put("total_count",total_count);
                map.put("total_sales",total_sales);

                responseDto.setData(map);
                responseDto.setMessage("조회 성공");
                break;
            case 1:
                CartStatisticsListDto cartStatisticsListDto = new CartStatisticsListDto(new TreeMap<>(),0);
                List<Carts>carts = cartRepository.findAll();
                for(Carts cart:carts){
                    String big_category_name = cart.getInventory().getProduct().
                                                getSmallCategory().getBigCategory()
                                                .getCategoryName();

                    String small_category_name = cart.getInventory().getProduct().
                                                    getSmallCategory().getSmallCategoryName();
                    CartBigCategoryDto cartBigCategoryDto = cartStatisticsListDto.getBig_categories()
                            .getOrDefault(big_category_name,new CartBigCategoryDto(new TreeMap<>(),0));

                    cartBigCategoryDto.update(small_category_name,cart.getProductCount());

                    cartStatisticsListDto.update(big_category_name,cartBigCategoryDto);
                    total+=cart.getProductCount();
                }

                cartStatisticsListDto.setTotal_count(total);
                responseDto.setData(cartStatisticsListDto);
                responseDto.setMessage("조회 성공");
                break;
            case 2:case 3:
                List<Orders>orders = orderRepository.findByOrderList_DateBetween(start_date,end_date);
                if(menu==2){
                    Map<String,ProductStatisticsDto>productStatistics=new HashMap<>();
                    ProductStatisticsDtoComparator vc = new ProductStatisticsDtoComparator(productStatistics);
                    Map<String,ProductStatisticsDto>sortedMap=new TreeMap<>(vc);

                    for(Orders order:orders){

                        String product_name = order.getInventory().getProduct().getName();
                        String big_category_name = order.getInventory().getProduct().getSmallCategory().getBigCategory().getCategoryName();
                        String small_category_name = order.getInventory().getProduct().getSmallCategory().getSmallCategoryName();

                        ProductStatisticsDto productStatisticsDto = productStatistics.getOrDefault(product_name,
                                new ProductStatisticsDto(product_name,big_category_name,small_category_name));

                        productStatisticsDto.updateCount(order.getCount());
                        productStatisticsDto.updateSalesAmount(order.getPrice());
                        productStatistics.put(order.getInventory().getProduct().getName(),productStatisticsDto);
                    }
                    sortedMap.putAll(productStatistics);
                    List<ProductSaleRankDto>productSaleRanks = new ArrayList<>();
                    int count = 0;
                    for(String key: sortedMap.keySet()) {
                        if(count++>5)break;
                        ProductStatisticsDto value = sortedMap.get(key);

                        ProductSaleRankDto productSaleRankDto = ProductSaleRankDto.builder()
                                                                .big_category_name(value.getBig_category_name())
                                                                .rank(count)
                                                                .count(value.getCount())
                                                                .product_name(value.getProduct_name())
                                                                .small_category_name(value.getSmall_category_name())
                                                                .sales_amount(value.getSales_amount())
                                                                .build();
                        productSaleRanks.add(productSaleRankDto);
                    }
                    responseDto.setData(productSaleRanks);
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

                        percentStatistics.getBig_category().put(big_category_name,bigCategoryPercentDto);
                        percentStatistics.getBig_category().get(big_category_name).getSmall_category().put(small_category_name,smallCategoryPercentDto);
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
class ProductStatisticsDtoComparator implements Comparator<String> {

    Map<String, ProductStatisticsDto> base;
    public ProductStatisticsDtoComparator(Map<String, ProductStatisticsDto> base) {
        this.base = base;
    }
    public int compare(String a, String b) {
        return (base.get(a)).compareTo(base.get(b));
    }

}