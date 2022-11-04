package com.tasteshopping.inquiry.Exception;

public class NoInquiryException extends RuntimeException  {
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
