package com.tasteshopping.order.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.dto.InventoryDto;
import com.tasteshopping.inventory.dto.InventoryResDto;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderListServiceImpl implements OrderListService {


    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final ProductOptionRepository productOptionRepository;
    @Override
    public List<OrderListDto> getOrderLists(String email) {
        Users user = userRepository.findByEmail(email).get();
        List<OrderLists> orderLists = orderListRepository.findByUser(user);
        List<OrderListDto> orderListDtos = new ArrayList<>();
        for (int i = 0; i < orderLists.size(); ++i) {
            OrderListDto orderListDto = orderLists.get(i).toDto();
            orderListDtos.add(orderListDto);
        }

        return orderListDtos;
    }

    @Override
    public BaseRes getOrder(String email, int order_lists_uid) {
        Optional<OrderLists> ordersOptional = orderListRepository.findById(order_lists_uid);
        if (ordersOptional.isPresent()) {
            Users user = ordersOptional.get().getUser();
            Optional<Users> loginUser = userRepository.findByEmail(email);
            if (loginUser.isPresent()) {
                if (loginUser.get() != user) {
                    return new BaseRes(401, "no authorization", null);
                }
            }
            List<Orders> ordersList = orderRepository.findByOrderList(ordersOptional.get());
            List<OrderDto> orderDtoList = new ArrayList<OrderDto>();
            for (int i = 0; i < ordersList.size(); ++i) {
                OrderDto tmpOrdersList = ordersList.get(i).toDto();

                Inventories inventories = ordersList.get(i).getInventory();
                InventoryDto inventoryDto = inventories.toDto();
                inventoryDto.setProductDto(inventories.getProduct().toDto());
                String[] optionUidList = inventories.getProductOptionList().split(" ");
                List<HashMap<String,String>> retProductOptions = new ArrayList<HashMap<String,String>>();
                for(int j=0;j<optionUidList.length;++j){
                    ProductOptions productOptions = productOptionRepository.findById(Integer.parseInt(optionUidList[j].trim())).get();
                    HashMap<String,String> hashMap = new HashMap<>();
                    hashMap.put(productOptions.getName(),productOptions.getValue());
                    retProductOptions.add(hashMap);
                }
                inventoryDto.setProductOptions(retProductOptions);
                tmpOrdersList.setInventoryDto(inventoryDto);
                orderDtoList.add(tmpOrdersList);
            }
            if (ordersList != null) {
                return new BaseRes(200, "get product list success", orderDtoList);
            } else {
                return new BaseRes(204, "product not found", orderDtoList);
            }
        }
        return new BaseRes(204, "orderLists not found", null);
    }

    @Override
    public BaseRes getNoReviewOrder(String email) {
        List<OrderLists> orderListsList = orderListRepository.findAll();
        Optional<Users> loginUser = userRepository.findByEmail(email);
        List<OrderDto> orderDtoList = new ArrayList<OrderDto>();
        for (int i = 0; i < orderListsList.size(); ++i) {
            if (loginUser.isPresent()) {
                if (loginUser.get() != orderListsList.get(i).getUser()) {
                    continue;
                }
            }
            List<Orders> ordersList = orderRepository.findByOrderList(orderListsList.get(i));
            for (int j = 0; j < ordersList.size(); ++j) {
                if (ordersList.get(j).getReview() == null) {
                    orderDtoList.add(ordersList.get(j).toDto());
                }
            }
        }
        if (orderDtoList != null) {
            return new BaseRes(200, "get product list success", orderDtoList);
        } else {
            return new BaseRes(204, "product not found", orderDtoList);
        }
    }

    @Override
    public BaseRes getOrdersGroupByDate(String email) {
        List<OrderLists> orderListsList = orderListRepository.findAll();
        Optional<Users> loginUser = userRepository.findByEmail(email);
        List<OrderDto> orderDtoList = new ArrayList<>();
        for (int i = 0; i < orderListsList.size(); ++i) {
            if (loginUser.isPresent()) {
                if (loginUser.get() != orderListsList.get(i).getUser()) {
                    continue;
                }
            }
            List<Orders> ordersList = orderRepository.findByOrderList(orderListsList.get(i));
            for (int j = 0; j < ordersList.size(); ++j) {
                if (ordersList.get(j).getReview() == null) {
                    orderDtoList.add(ordersList.get(j).toDto());
                }
            }
        }
        if (orderDtoList != null) {
            return new BaseRes(200, "get product list success", orderDtoList);
        } else {
            return new BaseRes(204, "product not found", orderDtoList);
        }
    }
}
