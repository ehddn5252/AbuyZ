package com.tasteshopping.common.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseRes {
    String message=null;
    Integer statusCode = null;
    Object data = null;

    public BaseRes(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public BaseRes(Integer statusCode,String message, Object data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public static BaseRes of(Integer statusCode,String message) {
        BaseRes responseBody = new BaseRes();
        responseBody.statusCode = statusCode;
        responseBody.message = message;
        return responseBody;
    }

    public static BaseRes of(Integer statusCode,String message,Object data) {
        BaseRes responseBody = new BaseRes();
        responseBody.statusCode = statusCode;
        responseBody.message = message;
        responseBody.data = data;
        return responseBody;
    }
}