package com.tasteshopping.common.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class UtilService {

    public static Date getToday() {
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

    public static Date getTodayTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss");

        Date date = new Date(System.currentTimeMillis());
        String s = formatter.format(date).toString();
        try {
            date = formatter.parse(s);
        } catch (ParseException pErr) {
            System.out.println(pErr);
        }
        return date;
    }

    public static Date getDateAfterDay(int day) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Date date = new Date(System.currentTimeMillis());
        String s = formatter.format(date).toString();
        try {
            // 특정일 다음날(1일 후) 날짜시간 구하기
            // 2020년 01월 01일 09시 20분 30초의 다음날(1일 후)

            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            cal.add(Calendar.DATE, day); // 다음날(1일 후)
            date=cal.getTime();
        } catch (Exception e) {
            System.out.println(e);
        }
        return date;
    }

}
