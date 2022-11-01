package com.tasteshopping.order.dto;

public enum OrderStatus {
    // CANCEL 결제 취소 완료, CANCEL_REQUEST 결제 취소 요청, PROCESS 결제 진행 중, SALE 판매 중,
    // WAITING_SALES_APPROVAL 판매 요청 대기중, SOLD 주문 완료, EXCHANGE 교환 중, RETURN 반환 중
    CANCEL, CANCEL_REQUEST, PROCESS,  SOLD, EXCHANGE, RETURN
}
