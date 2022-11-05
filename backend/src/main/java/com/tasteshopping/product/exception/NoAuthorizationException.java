package com.tasteshopping.product.exception;

public class NoAuthorizationException extends RuntimeException {
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
