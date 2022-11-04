package com.tasteshopping.inquiry.Exception;

public class NotCorrectUserException extends RuntimeException  {
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
