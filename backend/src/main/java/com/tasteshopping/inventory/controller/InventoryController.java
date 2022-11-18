package com.tasteshopping.inventory.controller;

import com.tasteshopping.cart.dto.CartDto;
import com.tasteshopping.cart.dto.CartReqDto;
import com.tasteshopping.cart.exception.OutOfStockException;
import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.dto.InventoryReqDto;
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

    @PostMapping("/cart/check-inventory")
    public ResponseEntity<BaseRes> checkCartInventory(@AuthenticationPrincipal String email){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(inventoryService.checkCartByInventory(email));
        }
        catch(OutOfStockException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new BaseRes(204, "상품 재고가 남아있지 않습니다.",null));
        }
    }

    @GetMapping("/empty/num")
    public ResponseEntity<BaseRes> getEmtpyInventoryNum(@AuthenticationPrincipal String email){
        // 재고가 0인 옵션의 상품 개수 가져오기
        
        Integer num = inventoryService.getEmptyNum();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseRes(200, "상품 재고 0의 개숙.",num));
    }

    @PostMapping("/basic/check-inventory")
    public ResponseEntity<BaseRes> checkInventory(@AuthenticationPrincipal String email, @RequestBody CartReqDto cartReqDto){
        CartDto cartDto = cartReqDto.toDto();
        try {
            return ResponseEntity.status(HttpStatus.OK).body(inventoryService.checkBasicByInventory(email, cartDto));
        }
        catch (OutOfStockException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "상품 재고가 부족합니다."));
        }
    }


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
    public ResponseEntity<BaseRes> putInventoryList(@AuthenticationPrincipal String email, @RequestBody InventoryReqDto inventoryReqDto){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(inventoryService.putInventoryList(inventoryReqDto));
        }
        catch (ProductNotFoundException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseRes.of(204, "해당 상품이 존재하지 않습니다."));
        }
    }
}
