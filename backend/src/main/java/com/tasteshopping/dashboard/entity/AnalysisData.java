package com.tasteshopping.dashboard.entity;

import com.tasteshopping.dashboard.dto.AnalysisDataDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;
    String pageName;

    @Column(nullable = false)
    @ColumnDefault("0")
    int visitCount;

    @CreatedDate
    @Temporal(TemporalType.DATE)
    Date date;

    public void modifyInfo(String pageName,Date date){
        this.pageName=pageName;
        this.date=date;
        this.visitCount=0;
    }

    public void visit(){
        this.visitCount +=1;
    }

    public void cancelVisit(){
        this.visitCount -=1;
    }

    public AnalysisDataDto toDto(){
        return AnalysisDataDto.builder()
                .uid(uid)
                .pageName(pageName)
                .visitCount(visitCount)
                .date(date)
                .build();
    }
}
