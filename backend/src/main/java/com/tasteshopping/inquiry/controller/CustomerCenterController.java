package com.tasteshopping.inquiry.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;
import com.tasteshopping.inquiry.dto.ReplyReqDto;
import com.tasteshopping.inquiry.service.CustomerCenterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/customer-center")
@RequiredArgsConstructor
public class CustomerCenterController {


    @Autowired
    CustomerCenterService customerCenterService;


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
    public ResponseEntity<BaseRes> writeInquiry(@AuthenticationPrincipal String email,@RequestBody CustomerCenterWriteReqDto customerCenterWriteReqDto) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        customerCenterService.createCustomerCenterByUid(email,customerCenterWriteReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 작성 성공"));
    }

    @DeleteMapping("/{uid}")
    public ResponseEntity<BaseRes> deleteInquiry(@AuthenticationPrincipal String email,@PathVariable Integer uid) {
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        customerCenterService.deleteCustomerCenterByUid(uid);
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
        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 답변 작성 성공"));
    }

    @DeleteMapping("/reply/{uid}")
    public ResponseEntity<BaseRes> writeReplyInquiry(@AuthenticationPrincipal String email,@PathVariable Integer uid){
        if (email.equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(403, "로그인을 해주세요"));
        }
        customerCenterService.deleteCustomerCenterByUid(uid);

        return ResponseEntity.status(HttpStatus.OK).body(BaseRes.of(200, "문의 제거 성공"));
    }

}
