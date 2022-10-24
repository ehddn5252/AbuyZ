package com.tasteshopping.order.service;

import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderListServiceImpl implements OrderListService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderListRepository orderListRepository;
    @Override
    public List<OrderListDto> getOrderLists(String email) {
        Users user = userRepository.findByEmail(email).get();
        List<OrderLists> orderLists = orderListRepository.findByUsersUid(user.getUid());
        List<OrderListDto> orderListDtos = new ArrayList<>();
        for(int i=0;i< orderLists.size();++i){
            OrderListDto orderListDto = orderLists.get(i).toDto();
            orderListDtos.add(orderListDto);
        }

        return orderListDtos;
    }
}
