package com.tasteshopping.product.exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class OptionNotFoundException extends RuntimeException  {
    final public ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseRes.of(404, "옵션을 등록하지 않았습니다.", null));
    public OptionNotFoundException() {
    }

    public OptionNotFoundException(String message) {
        super(message);
    }

    public OptionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public OptionNotFoundException(Throwable cause) {
        super(cause);
    }
}
