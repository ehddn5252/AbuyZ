package com.tasteshopping.order.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.inventory.dto.InventoryDto;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.order.dto.CanWriteReviewDto;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.exception.OptionNotFoundException;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public BaseRes getOrderFromOrderListsUid(String email, int order_lists_uid) {
        Optional<OrderLists> orderListsOptional = orderListRepository.findFetchJoinById(order_lists_uid);
        if (orderListsOptional.isPresent()) {
            Users user = orderListsOptional.get().getUser();
            Optional<Users> loginUser = userRepository.findByEmail(email);
            if (loginUser.isPresent()) {
                if (loginUser.get() != user) {
                    return new BaseRes(401, "no authorization", null);
                }
            }
            List<Orders> ordersList = orderRepository.findByOrderList(orderListsOptional.get());
            List<OrderDto> orderDtoList = new ArrayList<OrderDto>();
            for (int i = 0; i < ordersList.size(); ++i) {
                OrderDto tmpOrdersList = ordersList.get(i).toDto();
                Inventories inventories = ordersList.get(i).getInventory();
                InventoryDto inventoryDto = inventories.toDto();
                inventoryDto.setProductDto(inventories.getProduct().toDto());
                String[] optionUidList = inventories.getProductOptionList().split(" ");
                List<HashMap<String, String>> retProductOptions = new ArrayList<HashMap<String, String>>();
                for (int j = 0; j < optionUidList.length; ++j) {
                    ProductOptions productOptions = productOptionRepository.findById(Integer.parseInt(optionUidList[j].trim())).get();
                    HashMap<String, String> hashMap = new HashMap<>();
                    hashMap.put(productOptions.getName(), productOptions.getValue());
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
            orderListsList.get(i).getDate();
            List<Orders> ordersList = orderRepository.findByOrderList(orderListsList.get(i));
            for (int j = 0; j < ordersList.size(); ++j) {
                if (ordersList.get(j).getReview() == null) {
                    OrderDto tmpOrdersList = ordersList.get(j).toDto();
                    Inventories inventories = ordersList.get(j).getInventory();
                    InventoryDto inventoryDto = inventories.toDto();
                    inventoryDto.setProductDto(inventories.getProduct().toDto());
                    String[] optionUidList = inventories.getProductOptionList().split(" ");
                    List<HashMap<String, String>> retProductOptions = new ArrayList<HashMap<String, String>>();
                    for (int k = 0; k < optionUidList.length; ++k) {
                        ProductOptions productOptions = productOptionRepository.findById(Integer.parseInt(optionUidList[k].trim())).get();
                        HashMap<String, String> hashMap = new HashMap<>();
                        hashMap.put(productOptions.getName(), productOptions.getValue());
                        retProductOptions.add(hashMap);
                    }
                    inventoryDto.setProductOptions(retProductOptions);
                    tmpOrdersList.setInventoryDto(inventoryDto);
                    orderDtoList.add(tmpOrdersList);
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

    @Override
    public List<OrderListDto> getOrderListsWeek(String email) {
        Users user = userRepository.findByEmail(email).get();
        Date startDay = UtilService.getDateTimeAfterDay(-7);
        Date today = UtilService.getDateTimeAfterDay(0);
        List<OrderLists> orderLists = orderListRepository.findByUserAndDateBetween(user, startDay, today);
        List<OrderListDto> orderListDtos = new ArrayList<>();
        for (int i = 0; i < orderLists.size(); ++i) {
            OrderListDto orderListDto = orderLists.get(i).toDto();
            orderListDtos.add(orderListDto);
        }
        return orderListDtos;
    }

    @Override
    public BaseRes getMyNoReviewOrder(String email) {
        Users user = userRepository.findByEmail(email).get();
        List<CanWriteReviewDto> canWriteReviewDtos= new ArrayList<>();
        List<Orders> orders = orderRepository.findMyOrderByNoReview(user.getUid());
        for (int i = 0; i < orders.size(); ++i) {
            CanWriteReviewDto canWriteReviewDto = new CanWriteReviewDto();
            canWriteReviewDto.setOrderDate(orders.get(i).getOrderList().getDate());
            canWriteReviewDto.setRepImg(orders.get(i).getInventory().getProduct().getRepImg());
            canWriteReviewDto.setTitle(orders.get(i).getInventory().getProduct().getName());

            HashMap<String, List> hashMap = new HashMap<>();
            List<ProductOptions> productOptionsList = orders.get(i).getInventory().getProduct().getProductOptions();
            if (productOptionsList.isEmpty()) {
                throw new OptionNotFoundException();
            }
            String name = productOptionsList.get(0).getName();
            ArrayList<String> l = new ArrayList();
            for (int j = 0; j < productOptionsList.size(); ++j) {
                if (name.equals(productOptionsList.get(j).getName())) {
                    l.add(productOptionsList.get(j).getValue());
                } else {
                    ArrayList newL = new ArrayList<>();
                    newL.addAll(l);
                    hashMap.put(name, newL);
                    l.clear();
                    l.add(productOptionsList.get(j).getValue());
                    name = productOptionsList.get(j).getName();
                }
            }
            // 마지막에 한번 추가해줘야 한다.
            hashMap.put(name, l);
            canWriteReviewDto.setProductOptionListMap(hashMap);
            canWriteReviewDtos.add(canWriteReviewDto);
        }
        return new BaseRes(200,"리뷰 쓸 수 있는 상품 반환 성공",canWriteReviewDtos);
    }
}
