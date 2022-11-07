package com.tasteshopping.common.Exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NotFoundException  extends RuntimeException {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseRes.of(404, "Not Found Exception"));

    public NotFoundException() {
    }

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundException(Throwable cause) {
        super(cause);
    }
}
