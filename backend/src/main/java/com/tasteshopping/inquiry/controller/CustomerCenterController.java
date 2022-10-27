package com.tasteshopping.inquiry.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;
import com.tasteshopping.inquiry.dto.ReplyReqDto;
import com.tasteshopping.inquiry.service.CustomerCenterService;
import com.tasteshopping.review.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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


    @Autowired
    CustomerCenterService customerCenterService;

    @Autowired
    AwsS3Service awsS3Service;

    @GetMapping("/my")
    public ResponseEntity<BaseRes> getMyInquiry(@AuthenticationPrincipal String email) {
        System.out.println(email);
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        List<CustomerCenterDto> l = customerCenterService.getMyCustomerCenter(email);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "내 문의 내역 성공",l));
    }

    @GetMapping()
    public ResponseEntity<BaseRes> getInquiry() {
        List<CustomerCenterDto> l = customerCenterService.getCustomerCenter();
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "전체 문의 내역 성공",l));
    }

    @GetMapping("/detail/{uid}")
    public ResponseEntity<BaseRes> getDetailInquiry(@AuthenticationPrincipal String email,@PathVariable Integer uid) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        CustomerCenterDto customerCenterDto = customerCenterService.getCustomerCenterByUid(uid);
        if(customerCenterDto==null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "문의 내용 없음"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 상세 성공",customerCenterDto));
    }



    @PostMapping()
    public ResponseEntity<BaseRes> writeInquiry(@AuthenticationPrincipal String email,
                                                @RequestPart CustomerCenterWriteReqDto customerCenterWriteReqDto,
                                                @RequestPart(name = "file",required = false) MultipartFile multipartFile) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        String imagePath = null; //파일서버에업로드후 img_url 데려오기
        BaseRes res = null;
        try {
            imagePath = awsS3Service.uploadImgFile(multipartFile);
            customerCenterWriteReqDto.setImg_url(imagePath);
            res = customerCenterService.createCustomerCenterByUid(email,customerCenterWriteReqDto);
        } catch (IOException e) {
            e.printStackTrace();

            res = new BaseRes(202,"파일 업로드 에러", null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/list")
    public ResponseEntity<BaseRes> writeInquiryList(@AuthenticationPrincipal String email,
                                                @RequestPart CustomerCenterWriteReqDto customerCenterWriteReqDto,
                                                @RequestPart(name = "file",required = false) MultipartFile[] multipartFiles) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        String imagePath = null; //파일서버에업로드후 img_url 데려오기
        BaseRes res = null;
        try {
            for(int i=0;i<multipartFiles.length;++i){
                imagePath = awsS3Service.uploadImgFile(multipartFiles[i]);
                customerCenterWriteReqDto.setImg_url(imagePath);
                res = customerCenterService.createCustomerCenterByUid(email,customerCenterWriteReqDto);
            }
        } catch (IOException e) {
            e.printStackTrace();

            res = new BaseRes(202,"파일 업로드 에러", null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


    @DeleteMapping("/{uid}")
    public ResponseEntity<BaseRes> deleteInquiry(@AuthenticationPrincipal String email,@PathVariable Integer uid) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        customerCenterService.deleteCustomerCenterByUidSameEmail(uid, email);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 삭제 성공"));
    }

    @PutMapping("/{uid}")
    public ResponseEntity<BaseRes> modifyInquiry(@AuthenticationPrincipal String email, @PathVariable Integer uid, @RequestBody CustomerCenterWriteReqDto customerCenterWriteReqDto) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        customerCenterService.modifyCustomerCenterByUid(uid,customerCenterWriteReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 변경 성공"));
    }

    @PostMapping("/reply")
    public ResponseEntity<BaseRes> writeReplyInquiry(@AuthenticationPrincipal String email, @RequestBody ReplyReqDto replyReqDto){
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }

        int parentUid = replyReqDto.getParent_uid();
        String content = replyReqDto.getContent();
        BaseRes baseRes = customerCenterService.writeReplyCustomerCenter(email,parentUid,content);
        return ResponseEntity.status(HttpStatus.OK).body(baseRes);
    }

    @DeleteMapping("/reply/{uid}")
    public ResponseEntity<BaseRes> deleteReplyInquiry(@AuthenticationPrincipal String email,@PathVariable Integer uid){
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        BaseRes baseRes = customerCenterService.deleteCustomerCenterReplyByUid(uid,email);
        return ResponseEntity.status(HttpStatus.OK).body(baseRes);
    }

}
