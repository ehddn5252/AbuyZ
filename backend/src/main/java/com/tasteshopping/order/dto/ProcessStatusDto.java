package com.tasteshopping.order.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProcessStatusDto {
    Integer uid;
    String processStatusContent;
}
