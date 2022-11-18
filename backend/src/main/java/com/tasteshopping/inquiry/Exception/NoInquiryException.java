package com.tasteshopping.inquiry.Exception;

import com.tasteshopping.common.dto.BaseRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NoInquiryException extends RuntimeException  {
    public final ResponseEntity<BaseRes> baseResResponseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BaseRes(200, "문의 내역이 없습니다.", null));
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
