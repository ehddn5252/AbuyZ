package com.tasteshopping.inquiry.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.Exception.NoInquiryException;
import com.tasteshopping.inquiry.Exception.NotCorrectUserException;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;
import com.tasteshopping.inquiry.dto.Status;
import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.inquiry.repository.CustomerCenterRepository;
import com.tasteshopping.product.exception.NoAuthorizationException;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerCenterServiceImpl implements CustomerCenterService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerCenterRepository customerCenterRepository;
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
        
        // 고객 센터는 3개
        List<CustomerCenters> l = customerCenterRepository.orderByDate();

        List<CustomerCenterDto> new_l = new ArrayList<>();
        if (l.size() < 3) {
            for (int i = 0; i < l.size(); ++i) {
                new_l.add(l.get(i).toDto());
            }
        } else {
            for (int i = 0; i < 3; ++i) {
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
            customerCenter.setDate(date);
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
    public BaseRes writeReplyCustomerCenter(String email, int parentUid, String content) {

        BaseRes baseRes = new BaseRes();
        Optional<Users> usersOptional = userRepository.findByEmail(email);
        if (usersOptional.get().getUserRoles() == Role.ADMIN) {
            CustomerCenters childCustomerCenter = new CustomerCenters();

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date(System.currentTimeMillis());
            String s = formatter.format(date).toString();
            try {
                date = formatter.parse(s);
            } catch (ParseException pErr) {
                System.out.println(pErr);
            }
            Optional<CustomerCenters> parentCustomerCentersOptional = customerCenterRepository.findById(parentUid);
            CustomerCenters parentCustomerCenter = null;
            if (parentCustomerCentersOptional.isPresent()) {
                parentCustomerCenter = parentCustomerCentersOptional.get();
            }
            childCustomerCenter.setDate(date);
            childCustomerCenter.setUser(usersOptional.get());
            childCustomerCenter.setContent(content);
            childCustomerCenter.setCustomerCenterCategory(parentCustomerCenter.getCustomerCenterCategory());
            childCustomerCenter.setParent(parentCustomerCenter);
            childCustomerCenter.setStatus(Status.답변_완료.toString());
            parentCustomerCenter.setStatus(Status.답변_완료.toString());
            customerCenterRepository.save(childCustomerCenter);
            customerCenterRepository.save(parentCustomerCenter);
            baseRes.setMessage("문의 답변 작성 성공");
            baseRes.setStatusCode(200);
            return baseRes;
        } else {
            baseRes.setStatusCode(403);
            baseRes.setMessage("관리자가 아닙니다.");
            return baseRes;
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
    public BaseRes deleteCustomerCenterReplyByUid(Integer uid, String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        BaseRes baseRes = new BaseRes();
        if (user.get().getUserRoles() == Role.ADMIN) {
            deleteCustomerCenterByUid(uid);
            return new BaseRes(200, "문의 답글 제거 완료", null);
        } else {
            throw new NoAuthorizationException();
        }
    }

    @Override
    public void deleteCustomerCenterByUid(Integer uid) {
        CustomerCenters customerCenter = customerCenterRepository.findById(uid).get();
        customerCenterRepository.delete(customerCenter);
    }
}
