package com.tasteshopping.faq.dto;

import com.tasteshopping.faq.entity.FAQ;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FAQDto {
    Integer uid;
    private String question;
    private String answer;

    public FAQ toEntity(){
        return FAQ.builder()
                .answer(this.answer)
                .question(this.question)
                .build();
    }
}
