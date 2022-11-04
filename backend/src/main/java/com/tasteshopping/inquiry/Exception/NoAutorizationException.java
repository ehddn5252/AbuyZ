package com.tasteshopping.inquiry.Exception;

public class NoAutorizationException extends RuntimeException  {
    public NoAutorizationException() {
    }

    public NoAutorizationException(String message) {
        super(message);
    }

    public NoAutorizationException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoAutorizationException(Throwable cause) {
        super(cause);
    }
}
