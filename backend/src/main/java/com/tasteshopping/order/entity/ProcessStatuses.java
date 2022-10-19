package com.tasteshopping.order.entity;

import javax.persistence.*;

@Entity
public class ProcessStatuses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer uid;

    @Column(columnDefinition = "varchar(60) default 'notProcessed'")
    String process_status_content;
}
