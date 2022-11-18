package com.tasteshopping.cart.exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NotCorrectProductException extends RuntimeException  {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NO_CONTENT).body(new BaseRes(204, "상품 재고가 남아있지 않습니다.",null));
    public NotCorrectProductException() {
    }

    public NotCorrectProductException(String message) {
        super(message);
    }

    public NotCorrectProductException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotCorrectProductException(Throwable cause) {
        super(cause);
    }
}
