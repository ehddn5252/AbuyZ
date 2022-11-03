package com.tasteshopping.common.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UtilService {

    public static Date getDate(){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Date date = new Date(System.currentTimeMillis());
        String s = formatter.format(date).toString();
        try {
            date = formatter.parse(s);
        } catch (ParseException pErr) {
            System.out.println(pErr);
        }
        return date;
    }
}
