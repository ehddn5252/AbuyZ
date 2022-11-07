package com.tasteshopping.faq.entity;

import com.tasteshopping.faq.dto.FAQDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String answer;

    public FAQDto toDto(){
        return FAQDto.builder()
                .uid(this.uid)
                .answer(this.answer)
                .question(this.question)
                .build();
    }

    public void update(FAQDto faqDto){
        this.answer = faqDto.getAnswer();
        this.question = faqDto.getAnswer();
    }
}
