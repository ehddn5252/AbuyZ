package com.tasteshopping.order.entity;

import com.tasteshopping.product.entity.Products;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
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

    @Column(nullable = false)
    Integer totalPrice;

    @Column(columnDefinition = "varchar(10)")
    String day;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="products_uid")
    Products product;

}
