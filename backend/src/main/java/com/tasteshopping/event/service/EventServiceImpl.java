package com.tasteshopping.event.service;

import com.tasteshopping.common.service.ImageUploadService;
import com.tasteshopping.coupon.entity.Coupons;
import com.tasteshopping.coupon.repository.CouponRepository;
import com.tasteshopping.event.dto.EventReqDto;
import com.tasteshopping.event.dto.EventResDto;
import com.tasteshopping.event.entity.EventCouponLists;
import com.tasteshopping.event.entity.Events;
import com.tasteshopping.event.repository.EventCouponListRepository;
import com.tasteshopping.event.repository.EventRepository;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ImageUploadService imageUploadService;
    private final CouponRepository couponRepository;
    private final EventCouponListRepository eventCouponListRepository;
    @Override
    @Transactional
    public ResponseDto create(String email, MultipartFile thumbnail,
                              MultipartFile content_img, EventReqDto eventDto) {
        ResponseDto responseDto = new ResponseDto();
        if(!check(email)){
            responseDto.setMessage("추가 실패 : 궏한없음");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        try {
            if(thumbnail!=null){
                String thumbnail_url = imageUploadService.uploadImg(thumbnail);
                eventDto.setThumbnail(thumbnail_url);
            }
            if(content_img!=null){
                String content_img_url = imageUploadService.uploadImg(content_img);
                eventDto.setContentImg(content_img_url);
            }

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date start_date = formatter.parse(eventDto.getStart_date());
            Date end_date = formatter.parse(eventDto.getEnd_date());
            String now = LocalDateTime.now().toString();
            Date now_date = formatter.parse(now);

            if(start_date.after(now_date)){
                eventDto.setStatus(0);
            }
            else if(now_date.after(start_date) && now_date.before(end_date)){
                eventDto.setStatus(1);
            }
            else {
                eventDto.setStatus(2);
            }
            Events events = eventRepository.save(eventDto.toEntity());
            List<Coupons> coupons = couponRepository.findByUidIn(eventDto.getCoupon_lists());
            for(Coupons coupon: coupons){
                EventCouponLists eventCouponLists = EventCouponLists.builder()
                                        .coupons(coupon)
                                        .events(events)
                                        .build();
                eventCouponListRepository.save(eventCouponLists);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            responseDto.setMessage("추가 실패");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        responseDto.setMessage("추가 성공");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }
    @Override
    public ResponseDto getEventList(String email) {
        ResponseDto responseDto = new ResponseDto();

        List<Events>events = eventRepository.findAll();
        List<EventResDto> result = new ArrayList<>();

        for(Events event:events){
            result.add(event.toDto());
        }

        responseDto.setData(result);
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto deleteEvent(String email,int event_uid) {
        ResponseDto responseDto = new ResponseDto();

        if(!check(email)){
            responseDto.setMessage("삭제 실패 : 궏한없음");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }

        Events event = eventRepository.findById(event_uid).get();
        eventRepository.delete(event);

        responseDto.setMessage("삭제 성공");
        responseDto.setData(new ResultDto(true));

        return responseDto;
    }

    public boolean check(String email){
        Optional<Users> users = userRepository.findByEmail(email);
        if(!(users.isPresent() && users.get().getUserRoles() == Role.ADMIN)){
            return false;
        }
        return true;
    }
}
