package com.tasteshopping.inventory.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.dto.InventoryReqDto2;
import com.tasteshopping.inventory.dto.InventoryResDto;
import com.tasteshopping.inventory.entity.Inventories;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.inventory.exception.InventoryNotFoundException;
import com.tasteshopping.product.exception.ProductNotFoundException;
import com.tasteshopping.inventory.repository.InventoryRepository;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;


    private final ProductRepository productRepository;

    private final ProductOptionRepository productOptionRepository;



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

        List<InventoryResDto> ret = new ArrayList<>();
        for(int i=0;i<l.size();++i){
            InventoryResDto inventoryResDto = new InventoryResDto();
            Inventories inventories = l.get(i);
            inventoryResDto.setUid((inventories.getUid()));
            inventoryResDto.setCount(inventories.getCount());
            inventoryResDto.setPrice(inventories.getPrice());
            inventoryResDto.setProductOptionUidString(inventories.getProductOptionList());
            String[] optionUidList = inventories.getProductOptionList().split(" ");
            List<HashMap<String,String>> retProductOptions = new ArrayList<HashMap<String,String>>();
            for(int j=0;j<optionUidList.length;++j){
                ProductOptions productOptions = productOptionRepository.findById(Integer.parseInt(optionUidList[j].trim())).get();
                HashMap<String,String> hashMap = new HashMap<>();
                hashMap.put(productOptions.getName(),productOptions.getValue());
                retProductOptions.add(hashMap);
            }
            inventoryResDto.setProductOptions(retProductOptions);
            ret.add(inventoryResDto);
        }
        return new BaseRes(200,"재고목록 가져오기 성공",ret);
    }

    @Override
    public BaseRes putInventoryList(InventoryReqDto2 inventoryReqDto) {
        try {
            for (String productOptionString : inventoryReqDto.getInventory_option_list().keySet()) {
                Inventories inventory = inventoryRepository.findByOptionListString(productOptionString).get();
                inventory.setCount(Integer.parseInt(inventoryReqDto.getInventory_option_list().get(productOptionString).get("count")));
                inventory.setPrice(Integer.parseInt(inventoryReqDto.getInventory_option_list().get(productOptionString).get("price")));
                inventoryRepository.save(inventory);
            }
        }
        catch(InventoryNotFoundException e){
            return new BaseRes(204,"해당 product 옵션이 없습니다. 서버에서 확인",null);
        }
        return new BaseRes(200,"상품 재고 변경 성공",null);

    }
}