package com.tasteshopping.faq.service;

import com.tasteshopping.faq.dto.FAQDto;
import com.tasteshopping.faq.entity.FAQ;
import com.tasteshopping.faq.repository.FAQRepository;
import com.tasteshopping.user.dto.ResponseDto;
import com.tasteshopping.user.dto.ResultDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
@Transactional(readOnly = true)
public class FAQServiceImpl implements FAQService {
    private final FAQRepository faqRepository;
    @Override
    @Transactional
    public ResponseDto createFAQ(FAQDto faqDto){
        ResponseDto responseDto = new ResponseDto();
        try {
            faqRepository.save(faqDto.toEntity());
            responseDto.setMessage("등록 성공");
            responseDto.setData(new ResultDto(true));
        }catch (Exception e){
            responseDto.setMessage("등록 실패");
            responseDto.setData(new ResultDto(false));
            responseDto.setStatus(204);
            e.printStackTrace();
        }
        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto modifyFAQ(FAQDto faqDto,int faq_uid) {
        ResponseDto responseDto = new ResponseDto();
        Optional<FAQ>findFAQ = faqRepository.findById(faq_uid);
        if(!findFAQ.isPresent()){
            responseDto.setMessage("수정 실패");
            responseDto.setData(new ResultDto(false));
            responseDto.setStatus(204);
            return responseDto;
        }

        FAQ faq = findFAQ.get();
        faq.update(faqDto);

        responseDto.setMessage("수정 성공");
        responseDto.setData(new ResultDto(true));

        return responseDto;
    }

    @Override
    @Transactional
    public ResponseDto deleteFAQ(int faq_uid) {
        ResponseDto responseDto = new ResponseDto();
        Optional<FAQ>findFAQ = faqRepository.findById(faq_uid);
        if(!findFAQ.isPresent()){
            responseDto.setMessage("삭제 실패");
            responseDto.setData(new ResultDto(false));
            responseDto.setStatus(204);
            return responseDto;
        }
        faqRepository.deleteById(faq_uid);

        responseDto.setMessage("삭제 성공");
        responseDto.setData(new ResultDto(true));
        return responseDto;
    }

    @Override
    public ResponseDto getFAQList() {
        ResponseDto responseDto = new ResponseDto();

        List<FAQ> findFAQs = faqRepository.findAll();

        List<FAQDto> faqs = findFAQs.stream()
                            .map(f ->f.toDto())
                            .collect(Collectors.toList());
        responseDto.setData(faqs);
        responseDto.setMessage("조회 성공");
        return responseDto;
    }

}
