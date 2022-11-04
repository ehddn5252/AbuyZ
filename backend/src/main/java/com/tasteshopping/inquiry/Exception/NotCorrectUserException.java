package com.tasteshopping.inquiry.Exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NotCorrectUserException extends RuntimeException  {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new BaseRes(403, "해당 유저가 아닙니다.", null));
    public NotCorrectUserException() {
    }

    public NotCorrectUserException(String message) {
        super(message);
    }

    public NotCorrectUserException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotCorrectUserException(Throwable cause) {
        super(cause);
    }
}
