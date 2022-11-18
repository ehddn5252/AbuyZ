package com.tasteshopping.inquiry.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.Exception.NoInquiryException;
import com.tasteshopping.inquiry.Exception.NotCorrectUserException;
import com.tasteshopping.inquiry.dto.*;
import com.tasteshopping.inquiry.service.CustomerCenterService;
import com.tasteshopping.review.service.AwsS3Service;
import com.tasteshopping.user.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/customer-center")
@RequiredArgsConstructor
public class CustomerCenterController {

    final private CustomerCenterService customerCenterService;
    final private AwsS3Service awsS3Service;

    @GetMapping("/my")
    public ResponseEntity<BaseRes> getMyInquiry(@AuthenticationPrincipal String email) {
        System.out.println(email);
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        try {
            return ResponseEntity.status(HttpStatus.OK).body(customerCenterService.getMyCustomerCenter(email));
        }
        catch (NoInquiryException e){
            return(e.baseResResponseEntity);
        }
    }

    @GetMapping("/status/num/{status}")
    public ResponseEntity<BaseRes> getNoReplyNum(@AuthenticationPrincipal String email,@PathVariable String status) {
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new BaseRes(200,"특정 답변의 개수 가져오기 성공",customerCenterService.getNoReplyNum(status)));
        } catch (NoInquiryException e) {
            return e.baseResResponseEntity;
        }
    }

    @GetMapping("/current")
    public ResponseEntity<BaseRes> getCurrent() {
        List<CustomerCenterDto> l = customerCenterService.getCurrent();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "최근 문의 내역 가져오기", l));
    }

    @GetMapping()
    public ResponseEntity<BaseRes> getInquiry() {
        List<CustomerCenterDto> l = customerCenterService.getCustomerCenter();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 문의 내역 성공", l));
    }

    @GetMapping("/detail/{uid}")
    public ResponseEntity<BaseRes> getDetailInquiry(@AuthenticationPrincipal String email, @PathVariable Integer uid) {
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        CustomerCenterDto customerCenterDto = customerCenterService.getCustomerCenterByUid(uid);
        if (customerCenterDto == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "문의 내용 없음"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 상세 성공", customerCenterDto));
    }


    @PostMapping()
    public ResponseEntity<BaseRes> writeInquiry(@AuthenticationPrincipal String email,
                                                @RequestPart CustomerCenterWriteReqDto customerCenterWriteReqDto,
                                                @RequestPart(name = "file", required = false) MultipartFile multipartFile) {
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        BaseRes res;
        res = customerCenterService.createCustomerCenterByUid(email, customerCenterWriteReqDto, multipartFile);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

//    @PostMapping("/list")
//    public ResponseEntity<BaseRes> writeInquiryList(@AuthenticationPrincipal String email,
//                                                    @RequestPart CustomerCenterWriteReqDto customerCenterWriteReqDto,
//                                                    @RequestPart(name = "file", required = false) MultipartFile[] multipartFiles) {
//        if (email.equals("anonymousUser")) {
//            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
//        }
//        String imagePath = null; //파일서버에업로드후 img_url 데려오기
//        BaseRes res = null;
//        if (multipartFiles != null) {
//            try {
//                for (int i = 0; i < multipartFiles.length; ++i) {
//                    imagePath = awsS3Service.uploadImgFile(multipartFiles[i]);
//                    customerCenterWriteReqDto.setImg_url(imagePath);
//                    res = customerCenterService.createCustomerCenterByUid(email, customerCenterWriteReqDto);
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//                res = new BaseRes(202, "파일 업로드 에러", null);
//            }
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }


    @DeleteMapping("/{uid}")
    public ResponseEntity<BaseRes> deleteInquiry(@AuthenticationPrincipal String email, @PathVariable Integer uid) {
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        try {
            BaseRes baseRes = customerCenterService.deleteCustomerCenterByUidSameEmail(uid, email);
            return ResponseEntity.status(HttpStatus.OK).body(baseRes);
        } catch (NotCorrectUserException e) {
            return e.baseResResponseEntity;
//            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new BaseRes(403, "해당 유저가 아닙니다.", null));
        }
    }

    @PutMapping("/{uid}")
    public ResponseEntity<BaseRes> modifyInquiry(@AuthenticationPrincipal String email, @PathVariable Integer uid, @RequestBody CustomerCenterWriteReqDto customerCenterWriteReqDto) {
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "권한 없음. 로그인을 해주세요"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(customerCenterService.modifyCustomerCenterByUid(uid, customerCenterWriteReqDto));
    }

    @PostMapping("/reply")
    public ResponseEntity<ResponseDto> writeReplyInquiry(@RequestBody ReplyReqDto replyReqDto) {
        return new ResponseEntity<>(customerCenterService.writeReplyCustomerCenter(replyReqDto),HttpStatus.OK);
    }

    @DeleteMapping("/reply/{uid}")
    public ResponseEntity<ResponseDto> deleteReplyInquiry(@PathVariable int uid) {
        return new ResponseEntity<>(customerCenterService.deleteReplyInquiry(uid),HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<ResponseDto> search(@RequestBody SearchCondition searchCondition){
        return new ResponseEntity<>(customerCenterService.search(searchCondition),HttpStatus.OK);
    }
    /**
     * 고객센터 - 신고
     */
    @PutMapping("/report")
    public ResponseEntity<BaseRes> updateReportStatus(@AuthenticationPrincipal String email, @RequestBody CCReportReqDto dto){
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "권한 없음. 로그인을 해주세요"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(customerCenterService.updateReportStatus(dto));
    }

    @GetMapping("/report")
    public ResponseEntity<BaseRes> getReportList(@AuthenticationPrincipal String email, @RequestBody CCReportSelectReqDto dto){
        if (email.equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "권한 없음. 로그인을 해주세요"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(customerCenterService.getReportList(dto));
    }
}
