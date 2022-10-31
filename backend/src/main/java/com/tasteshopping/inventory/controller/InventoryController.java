package com.tasteshopping.inventory.controller;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.dto.InventoryReqDto2;
import com.tasteshopping.product.exception.ProductNotFoundException;
import com.tasteshopping.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/{productsUid}")
    public ResponseEntity<BaseRes> getInventoryList(@PathVariable Integer productsUid){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(inventoryService.getInventoryList(productsUid));
        }
        catch (ProductNotFoundException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "해당 상품이 존재하지 않습니다."));
        }
    }

    @PutMapping()
    public ResponseEntity<BaseRes> putInventoryList(@AuthenticationPrincipal String email, @RequestBody InventoryReqDto2 inventoryReqDto){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(inventoryService.putInventoryList(inventoryReqDto));
        }
        catch (ProductNotFoundException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "해당 상품이 존재하지 않습니다."));
        }
    }
}
