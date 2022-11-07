package com.tasteshopping.user.Exception;

public class BlackListException extends RuntimeException {
    public BlackListException() {
    }

    public BlackListException(String message) {
        super(message);
    }

    public BlackListException(String message, Throwable cause) {
        super(message, cause);
    }

    public BlackListException(Throwable cause) {
        super(cause);
    }
}
