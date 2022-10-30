package com.tasteshopping.product.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.dto.InventoryDto;
import com.tasteshopping.product.entity.Inventories;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.exception.ProductNotFoundException;
import com.tasteshopping.product.repository.InventoryRepository;
import com.tasteshopping.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;


    private final ProductRepository productRepository;

    @Override
    public void setPriceAndCount(int price, int count) {

    }

    @Override
    public BaseRes getInventoryList(int productsUid) {
        Optional<Products> productsOptional =productRepository.findById(productsUid);
        List<Inventories> l = new ArrayList<Inventories>();
        if(productsOptional.isPresent()){
            l = inventoryRepository.findByProduct(productsOptional.get());
        }
        else{
            throw new ProductNotFoundException();
        }

        List<InventoryDto> ret = new ArrayList<>();
        for(int i=0;i<l.size();++i){
            ret.add(l.get(i).toDto());
        }
        return new BaseRes(200,"재고목록 가져오기 성공",ret);
    }

    @Override
    public void putInventoryList(int productsUid) {

    }
}