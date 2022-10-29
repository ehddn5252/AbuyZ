package com.tasteshopping.inquiry.entity;

import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCenters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(name = "title", columnDefinition = "varchar(50)")
    private String title;

    @Column(name = "content", columnDefinition = "varchar(500)")
    private String content;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name ="img_url")
    private String imgUrl;

//    @Column(name = "date", nullable = false)
//    private Timestamp date;
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    Date date;
    String customerCenterCategory;

    @ManyToOne(fetch = FetchType.LAZY )
    @JoinColumn(name="users_uid")
    private Users user;

    // 부모 정의
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_centers_uid")
    private CustomerCenters parent;


    public CustomerCenterDto toDto(){
        CustomerCenterDto customerCenterDto = new CustomerCenterDto();
        customerCenterDto.setCustomerCenterCategory(customerCenterCategory);
        customerCenterDto.setContent(content);
        customerCenterDto.setDate(date);
//        customerCenterDto.setParent(parent);
        customerCenterDto.setStatus(status);
        customerCenterDto.setTitle(title);
        customerCenterDto.setUid(uid);
        customerCenterDto.setImgUrl(imgUrl);
        return customerCenterDto;
    }
}