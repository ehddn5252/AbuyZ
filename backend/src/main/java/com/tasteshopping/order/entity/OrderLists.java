package com.tasteshopping.order.entity;

import com.tasteshopping.order.dto.OrderListDto;
import com.tasteshopping.user.entity.Users;
import lombok.*;
import lombok.Getter;
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
public class OrderLists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    Date date;

//    @CreatedDate
//    private LocalDateTime createdDate;

    @Column(nullable = false)
    Integer totalPrice;

    @Column(columnDefinition = "varchar(10)")
    String day;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_uid")
    Users user;

    @OneToMany(mappedBy = "orderList",fetch = FetchType.LAZY)
    List<Orders> orders;

    String Status;


    public OrderListDto toDto(){
        OrderListDto orderListDto = new OrderListDto();
        orderListDto.setStatus(Status);
        orderListDto.setDate(date);
        orderListDto.setUserEmail(user.getEmail());
        orderListDto.setTotalPrice(totalPrice);
        orderListDto.setDay(day);
        orderListDto.setUid(uid);
        return orderListDto;
    }

}
