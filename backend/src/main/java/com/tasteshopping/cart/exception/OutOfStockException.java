package com.tasteshopping.cart.exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class OutOfStockException extends RuntimeException  {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NO_CONTENT).body(new BaseRes(204, "상품 재고가 남아있지 않습니다.",null));
    public OutOfStockException() {
    }

    public OutOfStockException(String message) {
        super(message);
    }

    public OutOfStockException(String message, Throwable cause) {
        super(message, cause);
    }

    public OutOfStockException(Throwable cause) {
        super(cause);
    }
}
