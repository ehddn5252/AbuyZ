package com.tasteshopping.inquiry.entity;

import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.Status;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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

    @Column(name = "img_url")
    private String imgUrl;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    Date start_date;

    @Column
    private Date end_date;

    String customerCenterCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_uid")
    private Users user;

    @Column
    private String reply;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_uid")
    private Orders order;

    public CustomerCenterDto toDto() {

        CustomerCenterDto customerCenterDto = new CustomerCenterDto();
        customerCenterDto.setCustomerCenterCategory(customerCenterCategory);
        customerCenterDto.setContent(content);
        customerCenterDto.setStart_date(this.start_date);
        customerCenterDto.setEnd_date(this.end_date);
        customerCenterDto.setStatus(status);
        customerCenterDto.setTitle(title);
        customerCenterDto.setUid(uid);
        customerCenterDto.setImgUrl(imgUrl);
        customerCenterDto.setReply(this.reply);
        customerCenterDto.setUserName(this.user.getName());

        if(order!=null){
            customerCenterDto.setProductsUid(order.getInventory().getProduct().getUid());
        }

        return customerCenterDto;

    }

    public void update(String content) {
        this.end_date = new Date();
        this.reply = content;
        this.status = Status.답변_완료.toString();
    }

}
