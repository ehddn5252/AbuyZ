package com.tasteshopping.inquiry.Exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AreadyAccessException extends RuntimeException  {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new BaseRes(404, "이미 접속한 이력이 있는 유저입니다.", null));
    public AreadyAccessException() {
    }

    public AreadyAccessException(String message) {
        super(message);
    }

    public AreadyAccessException(String message, Throwable cause) {
        super(message, cause);
    }

    public AreadyAccessException(Throwable cause) {
        super(cause);
    }
}
