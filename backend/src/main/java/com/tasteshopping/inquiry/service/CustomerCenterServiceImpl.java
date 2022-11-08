package com.tasteshopping.inquiry.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.Exception.NoInquiryException;
import com.tasteshopping.inquiry.Exception.NotCorrectUserException;
import com.tasteshopping.inquiry.dto.*;
import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.inquiry.repository.CustomerCenterRepository;
import com.tasteshopping.inquiry.repository.InquiryRepositoryImpl;
import com.tasteshopping.product.exception.NoAuthorizationException;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerCenterServiceImpl implements CustomerCenterService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerCenterRepository customerCenterRepository;

    private final InquiryRepositoryImpl inquiryRepository;
    @Override
    public Integer getNoReplyNum(String status) {
        List<CustomerCenters> l = customerCenterRepository.findByStatus(status);
        return l.size();
    }

    @Override
    public BaseRes getMyCustomerCenter(String email) {
        List<Optional<CustomerCenters>> l = customerCenterRepository.findByUserEmail(email);
        List<CustomerCenterDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            new_l.add(l.get(i).get().toDto());
        }
        if (new_l.size() == 0) {
            throw new NoInquiryException();
        }
        return new BaseRes(200, "내 문의 목록 조회 성공", new_l);
    }

    @Override
    public List<CustomerCenterDto> getCustomerCenter() {
        List<CustomerCenters> l = customerCenterRepository.findAll();
        List<CustomerCenterDto> new_l = new ArrayList<>();
        for (int i = 0; i < l.size(); ++i) {
            new_l.add(l.get(i).toDto());
        }
        return new_l;
    }

    @Override
    public List<CustomerCenterDto> getCurrent() {
        List<CustomerCenters> l = customerCenterRepository.orderByDate();

        List<CustomerCenterDto> new_l = new ArrayList<>();
        if (l.size() < 4) {
            for (int i = 0; i < l.size(); ++i) {
                new_l.add(l.get(i).toDto());
            }
        } else {
            for (int i = 0; i < 4; ++i) {
                new_l.add(l.get(i).toDto());
            }
        }
        return new_l;
    }

    @Override
    public CustomerCenterDto getCustomerCenterByUid(Integer uid) {
        Optional<CustomerCenters> customerCenters = customerCenterRepository.findById(uid);
        if (customerCenters.isPresent()) {
            return customerCenters.get().toDto();
        } else {
            return null;
        }
    }

    @Override
    public BaseRes modifyCustomerCenterByUid(Integer uid, CustomerCenterWriteReqDto customerCenterWriteReqDto) {

        CustomerCenters customerCenter = customerCenterRepository.findById(uid).get();
        if (customerCenterWriteReqDto.getContent() != null) {
            customerCenter.setContent(customerCenterWriteReqDto.getContent());
        }
        if (customerCenterWriteReqDto.getTitle() != null) {
            customerCenter.setTitle(customerCenterWriteReqDto.getTitle());
        }
        if (customerCenterWriteReqDto.getImg_url() != null) {
            customerCenter.setImgUrl(customerCenterWriteReqDto.getImg_url());
        }
        if (customerCenterWriteReqDto.getCustomer_center_category() != null) {
            customerCenter.setCustomerCenterCategory(customerCenterWriteReqDto.getCustomer_center_category());
        }
        customerCenterRepository.save(customerCenter);
        return new BaseRes(200, "문의 변경 성공", null);
    }

    @Override
    public BaseRes createCustomerCenterByUid(String email, CustomerCenterWriteReqDto customerCenterWriteReqDto) {
        try {
            Optional<Users> usersOptional = userRepository.findByEmail(email);
            CustomerCenters customerCenter = new CustomerCenters();

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date(System.currentTimeMillis());
            String s = formatter.format(date).toString();
            try {
                date = formatter.parse(s);
            } catch (ParseException pErr) {
                System.out.println(pErr);
            }
            customerCenter.setStart_date(date);
            customerCenter.setContent(customerCenterWriteReqDto.getContent());
            customerCenter.setStatus(Status.답변_미완료.toString());
            customerCenter.setTitle(customerCenterWriteReqDto.getTitle());
            customerCenter.setImgUrl(customerCenterWriteReqDto.getImg_url());
            customerCenter.setCustomerCenterCategory(customerCenterWriteReqDto.getCustomer_center_category());
            customerCenter.setUser(usersOptional.get());
            customerCenterRepository.save(customerCenter);
            return new BaseRes(200, "문의 작성 성공", null);
        } catch (Exception e) {
            return new BaseRes(500, "문의 저장 서버 에러", null);
        }
    }

    @Override
    public BaseRes deleteCustomerCenterByUidSameEmail(Integer uid, String email) {
        CustomerCenters customerCenter = customerCenterRepository.findById(uid).get();
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.get().getUid() == customerCenter.getUser().getUid()) {
            deleteCustomerCenterByUid(uid);
            return new BaseRes(200, "문의 삭제 성공", null);
        } else {
            throw new NotCorrectUserException();
        }
    }

    @Override
    public void deleteCustomerCenterByUid(Integer uid) {
        CustomerCenters customerCenter = customerCenterRepository.findById(uid).get();
        customerCenterRepository.delete(customerCenter);
    }




    @Override
    @Transactional
    public ResponseDto deleteReplyInquiry(int uid) {
        ResponseDto responseDto = new ResponseDto();
        Optional<CustomerCenters>customerCenter = customerCenterRepository.findById(uid);
        if(!customerCenter.isPresent()){
            responseDto.setMessage("잘못된 접근");
            responseDto.setData(new ResultDto(false));
            responseDto.setStatus(204);
            return responseDto;
        }
        customerCenter.get().update(null);
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }
    @Override
    @Transactional
    public ResponseDto writeReplyCustomerCenter(ReplyReqDto replyReqDto) {
        ResponseDto responseDto = new ResponseDto();
        Optional<CustomerCenters>customerCenter = customerCenterRepository.findById(replyReqDto.getUid());
        if(!customerCenter.isPresent()){
            responseDto.setMessage("잘못된 접근");
            responseDto.setData(new ResultDto(false));
            return responseDto;
        }
        customerCenter.get().update(replyReqDto.getContent());
        responseDto.setMessage("답변 성공");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }
    @Override
    public ResponseDto search(SearchCondition searchCondition){
        ResponseDto responseDto = new ResponseDto();
        List<FilteredDto>result = inquiryRepository.filterSearch(searchCondition);
        responseDto.setData(result);
        responseDto.setMessage("조회 성공");
        return responseDto;
    }
}
