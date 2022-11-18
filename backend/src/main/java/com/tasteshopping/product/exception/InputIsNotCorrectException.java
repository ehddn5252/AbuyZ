package com.tasteshopping.product.exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class InputIsNotCorrectException extends RuntimeException {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(BaseRes.of(400, "잘못된 인풋 값을 넣었습니다."));

    public InputIsNotCorrectException() {
    }

    public InputIsNotCorrectException(String message) {
        super(message);
    }

    public InputIsNotCorrectException(String message, Throwable cause) {
        super(message, cause);
    }

    public InputIsNotCorrectException(Throwable cause) {
        super(cause);
    }
}
