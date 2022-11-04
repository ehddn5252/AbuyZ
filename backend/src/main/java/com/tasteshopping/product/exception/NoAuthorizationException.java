package com.tasteshopping.product.exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NoAuthorizationException extends RuntimeException {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(BaseRes.of(401, "권한이 없음"));

    public NoAuthorizationException() {
    }

    public NoAuthorizationException(String message) {
        super(message);
    }

    public NoAuthorizationException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoAuthorizationException(Throwable cause) {
        super(cause);
    }
}
