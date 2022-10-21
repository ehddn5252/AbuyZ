package com.tasteshopping.order.entity;

import com.tasteshopping.product.entity.Products;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
public class OrderLists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    Date date;

    @Column(nullable = false)
    Integer totalPrice;

    @Column(columnDefinition = "varchar(10)")
    String day;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;

}
