package com.tasteshopping.order.entity;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.user.entity.Users;
import lombok.*;
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

}
