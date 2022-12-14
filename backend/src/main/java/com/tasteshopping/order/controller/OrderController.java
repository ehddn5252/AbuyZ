package com.tasteshopping.order.controller;

import com.tasteshopping.cart.exception.OutOfStockException;
import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartReqDto;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.Exception.CartNotFoundException;
import com.tasteshopping.order.dto.*;
import com.tasteshopping.order.service.OrderListService;
import com.tasteshopping.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderListService orderListService;

//    @GetMapping("/test")
//    public ResponseEntity<BaseRes> payTest(){
//        /*
//
//            DB lock test
//
//            private Integer products_uid;
//            private Integer product_count;
//            private LinkedHashMap<String,String> option_values;
//            private Integer users_uid;
//            private Integer inventories_uid;
//            private Integer coupons_uid;
//            "780" "1254 1256" "1087"
//         */
//
//        CartDto cartDto = new CartDto();
//        cartDto.setProductsUid(780);
//        cartDto.setProductCount(1);
//        cartDto.setInventoriesUid(1087);
//        LinkedHashMap<String,String> option_values = new LinkedHashMap<String,String>();
//        option_values.put("size","260");
//        option_values.put("color","black");
//        cartDto.setOptionValues(option_values);
//        cartDto.setCouponsUid(0);
//        String email="zzieun_choi@naver.com";
//        orderService.basicPay(email,cartDto);
//        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "payTest ??????!"));
//    }


    @GetMapping("/status/num/{status}")
    public ResponseEntity<BaseRes> getByStatus(@AuthenticationPrincipal String email, @PathVariable String status) {
        // ?????? ???????????? ????????? ??????
        // PROCESS,
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "order ????????? ?????? order ?????? ???????????? ??????!", orderService.getNumByStatus(status)));
    }


    @GetMapping("")
    public ResponseEntity<BaseRes> getOrderLists(@AuthenticationPrincipal String email) {
        List<OrderListDto> orderListDtos = orderListService.getOrderLists(email);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "server test ??????!",orderListDtos));
    }

    @GetMapping("/from-before-week")
    public ResponseEntity<BaseRes> getOrderListsWeek(@AuthenticationPrincipal String email) {
        List<OrderListDto> orderListDtos = orderListService.getOrderListsWeek(email);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "server test ??????!",orderListDtos));
    }

    @GetMapping("/{order_lists_uid}")
    public ResponseEntity<BaseRes> getOrdersFromOrderList(@AuthenticationPrincipal String email,
                                                          @PathVariable Integer order_lists_uid) {
        return ResponseEntity.status(HttpStatus.OK).body(orderListService.getOrderFromOrderListsUid(email,order_lists_uid));
    }

    @GetMapping("/no-review")
    public ResponseEntity<BaseRes> getNoReviewOrdersFromOrderList(@AuthenticationPrincipal String email) {
        BaseRes baseRes = orderListService.getNoReviewOrder(email);
        return ResponseEntity.status(HttpStatus.OK).body(baseRes);
    }

    @GetMapping("/my/no-review")
    public ResponseEntity<BaseRes> getMyNoReviewOrdersFromOrderList(@AuthenticationPrincipal String email) {
        // ???????????? ????????? ?????? ?????? ??? ?????? ?????? ?????? ????????????!
        BaseRes baseRes = orderListService.getMyNoReviewOrder(email);
        return ResponseEntity.status(HttpStatus.OK).body(baseRes);
    }

    @GetMapping("/date")
    public ResponseEntity<BaseRes> getOrdersFromOrderListGroupByDate(@AuthenticationPrincipal String email) {
        BaseRes baseRes = orderListService.getOrdersGroupByDate(email);
        return ResponseEntity.status(HttpStatus.OK).body(baseRes);
    }


    @PutMapping("/status")
    public ResponseEntity<BaseRes> changeStatus(@AuthenticationPrincipal String email,
                                                @RequestBody OrderUidReqDto orderUidReqDto){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.changeStatus(orderUidReqDto.getOrder_uid(),orderUidReqDto.getStatus()));
    }

    @GetMapping("/status")
    public ResponseEntity<BaseRes> getStatus(@AuthenticationPrincipal String email,
                                                @RequestBody OrderUidReqDto orderUidReqDto){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getStatus(orderUidReqDto.getStatus()));
    }

    @GetMapping("/status/num")
    public ResponseEntity<BaseRes> getStatusNum(@AuthenticationPrincipal String email,
                                             @RequestBody OrderUidReqDto orderUidReqDto){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getStatusNum(orderUidReqDto.getStatus()));
    }

    @PostMapping("/cancel")
    public ResponseEntity<BaseRes> cancelPay(@AuthenticationPrincipal String email,
                                             @RequestBody OrderUidReqDto orderCancelReqDto){
        // ORDER??? ???????????? PROCESS,
        // ???????????? ?????? ????????? ???
        return ResponseEntity.status(HttpStatus.OK).body(orderService.orderCancel(orderCancelReqDto.getOrder_uid()));
    }

    @PostMapping("/cancel-register")
    public ResponseEntity<BaseRes> cancelRegister(@AuthenticationPrincipal String email,
                                                  @RequestBody AdminOrderCancelReqDto adminOrderCancelReqDto){
        // ???????????? ?????? ????????? ??? ( order ??? status??? ?????? ????????????(CANCEL_REQUEST)
        return ResponseEntity.status(HttpStatus.OK).body(orderService.orderRegisterCancel(adminOrderCancelReqDto.getOrder_uids()));
    }

    @PostMapping("/cart")
    public ResponseEntity<BaseRes> cartPay(@AuthenticationPrincipal String email, @RequestBody CouponListDto couponsDto){
        try{
            orderService.cartPay(email, couponsDto.getCoupons());
        }
        catch (OutOfStockException e){
            e.printStackTrace();
            return e.baseResResponseEntity;
        }
        catch (CartNotFoundException e){
            e.printStackTrace();
            return e.baseResResponseEntity;
        }
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "???????????? ??????!"));
    }

    @PostMapping("/basic")
    public ResponseEntity<BaseRes> basicPay(@AuthenticationPrincipal String email,
                                            @RequestBody CartReqDto cartReqDto){

        CartDto cartDto = cartReqDto.toDto();
        orderService.basicPay(email,cartDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "???????????? ??????!"));
    }


    @GetMapping("/success")
    public ResponseEntity<BaseRes> kakaoSuccess( @RequestParam String pg_token) {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "kakao test ??????!",pg_token));
    }
    @GetMapping("/fail")
    public ResponseEntity<BaseRes> kakaoFail() {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(BaseRes.of(400, "kakao test ??????!"));
    }

    @GetMapping("/cancel")
    public ResponseEntity<BaseRes> kakaoCancel() {
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(BaseRes.of(406, "kakao test ??????!"));
    }

    @GetMapping("/lastOrder")
    public ResponseEntity<BaseRes> getLastOrder() {
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "kakao test ??????!"));
    }
}
