package com.tasteshopping.inquiry.Exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NoInquiryException extends RuntimeException  {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BaseRes(404, "존재하지 않는 리소스에 대한 요청", null));
    public NoInquiryException() {
    }

    public NoInquiryException(String message) {
        super(message);
    }

    public NoInquiryException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoInquiryException(Throwable cause) {
        super(cause);
    }
}
