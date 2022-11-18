package com.tasteshopping.event.scheduler;


import com.tasteshopping.event.entity.Events;
import com.tasteshopping.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class EventScheduler {
    private final EventRepository eventRepository;
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void couponUpdate(){
        log.info("EventScheduler start");

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        LocalDate yesterdayLocalDate = LocalDate.now().minusDays(1);
        Date yesterday = null;
        Date today = null;
        try {
            yesterday = formatter.parse(yesterdayLocalDate.toString());
            today = formatter.parse(yesterdayLocalDate.toString());
        } catch (ParseException e) {
            log.warn("EventScheduler ParseException");
            e.printStackTrace();
        }
        List<Events> target = eventRepository.findByEndDateAndStatus(yesterday,1);
        for(Events events:target){
            events.updateStatus(2);
        }
        target = eventRepository.findByEndDateAndStatus(today,0);
        for(Events events:target){
            events.updateStatus(1);
        }
        log.info("EventScheduler finish");
    }
}