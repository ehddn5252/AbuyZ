package com.tasteshopping.product.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.BoSearchReqDto;
import com.tasteshopping.product.entity.Inventories;
import com.tasteshopping.product.exception.ProductNotFoundException;
import com.tasteshopping.product.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {


    private final InventoryService inventoryService;

    @GetMapping()
    public ResponseEntity<BaseRes> test(){
        int productUid = 15;
        try{
            return ResponseEntity.status(HttpStatus.OK).body(inventoryService.getInventoryList(productUid));
        }
        catch (ProductNotFoundException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "해당 상품이 존재하지 않습니다."));
        }
    }
}
