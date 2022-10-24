package com.tasteshopping.order.entity;

import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderLists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

//    @CreatedDate
//    @Temporal(TemporalType.TIMESTAMP)
//    Date date;

    @CreatedDate
    private LocalDateTime createdDate;

    @Column(nullable = false)
    Integer totalPrice;

    @Column(columnDefinition = "varchar(10)")
    String day;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    String Status;

    public OrderListDto toDto(){
        OrderListDto orderListDto = new OrderListDto();
        orderListDto.setStatus(Status);
        orderListDto.setCreatedDate(createdDate);
        orderListDto.setUserEmail(user.getEmail());
        orderListDto.setTotalPrice(totalPrice);
        orderListDto.setDay(day);
        orderListDto.setUid(uid);
        return orderListDto;
    }

}
