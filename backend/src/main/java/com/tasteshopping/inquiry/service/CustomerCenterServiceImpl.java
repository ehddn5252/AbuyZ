package com.tasteshopping.inquiry.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.common.service.UtilService;
import com.tasteshopping.inquiry.Exception.NoInquiryException;
import com.tasteshopping.inquiry.Exception.NotCorrectUserException;
import com.tasteshopping.inquiry.dto.*;
import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.inquiry.repository.CustomerCenterRepository;
import com.tasteshopping.inquiry.repository.InquiryRepositoryImpl;
import com.tasteshopping.order.dto.OrderStatus;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.order.service.OrderService;
import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.repository.ReportRepository;
import com.tasteshopping.review.service.AwsS3Service;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomerCenterServiceImpl implements CustomerCenterService {


    private final UserRepository userRepository;

    private final CustomerCenterRepository customerCenterRepository;

    private final ReportRepository reportRepository;

    private final InquiryRepositoryImpl inquiryRepository;

    private final OrderRepository orderRepository;

    private final AwsS3Service awsS3Service;

    @Override
    public Integer getNoReplyNum(String status) {
        List<CustomerCenters> l = customerCenterRepository.findByStatus(status);
        return l.size();
    }

    @Override
    public BaseRes getMyCustomerCenter(String email) {
//        List<Optional<CustomerCenters>> l = customerCenterRepository.findByUserEmailAndNoReply(email);
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
        List<CustomerCenters> l = customerCenterRepository.findAllFetchJoin();
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
    @Transactional
    public BaseRes createCustomerCenterByUid(String email, CustomerCenterWriteReqDto customerCenterWriteReqDto, MultipartFile descriptionImg) {
        try {
            Optional<Users> usersOptional = userRepository.findByEmail(email);
            CustomerCenters customerCenter = new CustomerCenters();

            String imagePath = null; //파일서버에업로드후 img_url 데려오기
            BaseRes res = null;
            if (descriptionImg != null) {
                try {
                    imagePath = awsS3Service.uploadImgFile(descriptionImg);
                    customerCenter.setImgUrl(imagePath);
                } catch (IOException e) {
                    e.printStackTrace();
                    res = new BaseRes(202, "파일 업로드 에러", null);
                    return res;
                }
            }
            if(customerCenterWriteReqDto.getOrder_uid()!=null) {
                Optional<Orders> ordersOptional = orderRepository.findById(customerCenterWriteReqDto.getOrder_uid());
                if (ordersOptional.isPresent()) {
                    Orders order = ordersOptional.get();
                    if (customerCenterWriteReqDto.getCustomer_center_category().equals(CustomerCenterCategory.환불.toString())) {
                        order.setStatus(OrderStatus.REFUND_REQUEST.toString());
                    }
                    customerCenter.setOrder(order);
                }
            }
            customerCenter.setStart_date(UtilService.getTodayTime());
            customerCenter.setContent(customerCenterWriteReqDto.getContent());
            customerCenter.setStatus(Status.답변_미완료.toString());
            customerCenter.setTitle(customerCenterWriteReqDto.getTitle());
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

    /**
     * 고객센터 - 신고
     */
    @Transactional
    @Override
    public BaseRes updateReportStatus(CCReportReqDto dto) {
        Reports reports = reportRepository.getReferenceById(dto.getReport_uid());
        reports.update(dto.getStatus());
        return new BaseRes(200, "고객센터 신고 - status 변경 성공", null);
    }

    @Override
    public BaseRes getReportList(CCReportSelectReqDto dto) {
        int reason = dto.getReason();
        String productName = "%" + dto.getProduct_name() + "%";
        int dateType = dto.getDate_type();
        String startDate = dto.getStart_date();
        String endDate = dto.getEnd_date();
        int status = dto.getStatus();

        return new BaseRes(200, "고객센터 신고 - 조회 하는중", null);
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
