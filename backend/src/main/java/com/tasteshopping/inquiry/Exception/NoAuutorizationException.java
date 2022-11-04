package com.tasteshopping.inquiry.Exception;

public class NoAuutorizationException extends RuntimeException  {
    public NoAuutorizationException() {
    }

    public NoAuutorizationException(String message) {
        super(message);
    }

    public NoAuutorizationException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoAuutorizationException(Throwable cause) {
        super(cause);
    }
}
