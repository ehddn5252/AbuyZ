package com.tasteshopping.order.service;

import com.tasteshopping.cart.exception.OutOfStockException;
import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.cart.repository.CartRepository;
import com.tasteshopping.cart.service.CartService;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.coupon.entity.CouponLists;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.coupon.repository.CouponListsRepository;
import com.tasteshopping.coupon.repository.CouponRepository;
import com.tasteshopping.coupon.service.CouponService;
import com.tasteshopping.order.Exception.CartNotFoundException;
import com.tasteshopping.order.dto.OrderDto;
import com.tasteshopping.order.dto.OrderStatus;
import com.tasteshopping.order.entity.OrderLists;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderListRepository;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.product.service.ProductService;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.common.service.UtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final OrderListRepository orderListRepository;

    private final CartService cartService;

    private final ProductService productService;

    private final CouponRepository couponRepository;

    private final CouponListsRepository couponListsRepository;

    @Override
    @Transactional
    public void cartPay(String email, List<Integer> coupons) {
        Users user = userRepository.findByEmail(email).get();
        List<Carts> cartList = cartRepository.findByUser(user);

        if (cartList.size()==0){
            throw new CartNotFoundException();
        }

        OrderLists orderLists = createOrderLists(user);
        orderLists.setStatus(OrderStatus.PROCESS.toString());
        for (int i = 0; i < cartList.size(); ++i) {
            orderLists = pay(cartList.get(i), orderLists, user, orderLists.getTotalPrice(), coupons.get(i));
            // ????????????
        }
        orderListRepository.save(orderLists);
    }

    public OrderLists createOrderLists(Users user) {
        OrderLists orderLists = new OrderLists();
        orderLists.setUser(user);
        orderLists.setTotalPrice(0);
        orderLists.setDay(LocalDateTime.now().getDayOfWeek().toString());
        Date date = UtilService.getTodayTime();
        orderLists.setDate(date);
        return orderListRepository.save(orderLists);
    }

    @Transactional
    public OrderLists pay(Carts cart, OrderLists orderLists, Users user, int totalPrice, Integer couponsUid) {
        Orders orders = new Orders();
        orders.setOrderList(orderLists);
        orders.setCount(cart.getProductCount());
        orders.setStatus(OrderStatus.PROCESS.toString());
        Inventories inventory = cart.getInventory();
        // ?????? ????????? ??????
        Integer price = (100 - inventory.getProduct().getDiscountRate()) * inventory.getProduct().getPrice() / 100 + inventory.getPrice();

        // ?????? ??????
        if (couponsUid != 0) {
            Optional<Coupons> coupon = couponRepository.findById(couponsUid);
            price = price - coupon.get().getDiscountPrice();
            CouponLists couponLists =  couponListsRepository.findByCouponsAndUser(coupon.get(),user);
            orders.setCoupon(coupon.get());
            couponLists.use();
        }


        orders.setPrice(price);
        orders.setInventory(inventory);
        int remainingStoke = inventory.getCount() - cart.getProductCount();
        if (remainingStoke >= 0) {
            inventory.setCount(remainingStoke);
        } else {
            throw new OutOfStockException();
        }
        totalPrice += price * orders.getCount();
        orderRepository.save(orders);
        cartRepository.delete(cart);

        // ????????? ?????????????????? ?????? ?????? ??????
        productService.checkStatus(cart.getInventory().getProduct().getUid());
        orderLists.setTotalPrice(totalPrice);
        return orderLists;
    }

    @Override
    @Transactional
    public void basicPay(String email,
                         CartDto cartDto) {
        // ?????? ???????????? -> ????????? ?????? ?????? ??????????????? ???????????? ??????
        cartService.putCart(email, cartDto);
        Users user = userRepository.findByEmail(email).get();
        // ???????????? ???????????? orderList ?????????
        OrderLists orderLists = createOrderLists(user);
        orderLists.setStatus(OrderStatus.PROCESS.toString());
        Carts cart = cartRepository.findByUserAndCurrentUid(user);
        orderLists = pay(cart, orderLists, user, 0,cartDto.getCouponsUid());

        // ????????? ????????? ???????????? ??????
//        orderLists.setTotalPrice(orderLists.getOrders().get(0).getInventory().getProduct().getDeliveryFee()+orderLists.getTotalPrice());

        orderListRepository.save(orderLists);
    }

    @Override
    @Transactional
    public BaseRes orderCancel(Integer orderUid) {
        // ????????? ??????????????? ?????? ????????? ?????? ??????
        Orders order = orderRepository.findById(orderUid).get();
        OrderLists orderLists = orderListRepository.findById(order.getOrderList().getUid()).get();
        if (order.getStatus().equals(OrderStatus.CANCEL_REQUEST.toString()) || order.getStatus().equals(OrderStatus.REFUND_REQUEST.toString())) {
            order.setStatus(OrderStatus.CANCEL.toString());
            order.getInventory().setCount(order.getInventory().getCount() + order.getCount());
            int couponPrice = 0;
            if(order.getCoupon()!=null){
                couponPrice=order.getCoupon().getDiscountPrice();
            }
            orderLists.setTotalPrice(orderLists.getTotalPrice() + couponPrice - (order.getPrice() * order.getCount()));
            // ?????? ?????? ?????? ??????
            orderListRepository.save(orderLists);
            orderRepository.save(order);
            return new BaseRes(200, "?????? or ?????? ??????", null);
        } else {
            return new BaseRes(202, "?????? or ?????? ??? ??? ?????? ???????????????.", null);
        }
    }

    @Override
    @Transactional
    public BaseRes orderRegisterCancel(List<Integer> orderUids) {
        // ????????? ??????????????? ?????? ??????
        for (int i = 0; i < orderUids.size(); ++i) {

            Orders order = orderRepository.findById(orderUids.get(i)).get();
            if (order.getStatus().equals(OrderStatus.PROCESS.toString())) {
                order.setStatus(OrderStatus.CANCEL_REQUEST.toString());
            }
            orderRepository.save(order);
        }
        return new BaseRes(200, "client ?????? ?????? ??????", null);
    }

    @Override
    @Transactional
    public BaseRes changeStatus(Integer orderUid, String status) {
        Orders order = orderRepository.findById(orderUid).get();
        // ?????? ???????????? ?????? CANCEL ?????? REFUND ??? ?????? ????????? ?????? ????????? ?????????.
        if (status.equals(OrderStatus.CANCEL.toString()) || status.equals(OrderStatus.REFUND.toString())) {
            orderCancel(orderUid);
        }
        order.setStatus(status);
        orderRepository.save(order);
        return new BaseRes(200, "?????? ?????? ?????? ??????", null);
    }

    @Override
    public BaseRes getStatus(String status) {
        List<Orders> l = orderRepository.findByStatus(status);
        List<OrderDto> newL = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            newL.add(l.get(i).toDto());
        }
        return new BaseRes(200, "?????? ?????? ???????????? ??????", newL);
    }

    @Override
    public BaseRes getStatusNum(String status) {
        List<Orders> l = orderRepository.findByStatus(status);

        return new BaseRes(200, "?????? ?????? ???????????? ??????", l.size());
    }

    @Override
    public Integer getNumByStatus(String status) {
        List<Orders> orders = orderRepository.findByStatus(status);
        if (orders.size() != 0) {
            return orders.size();
        }
        return 0;
    }
}