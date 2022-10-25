package com.tasteshopping.inquiry.service;

import com.tasteshopping.inquiry.dto.CustomerCenterDto;
import com.tasteshopping.inquiry.dto.CustomerCenterWriteReqDto;
import com.tasteshopping.inquiry.entity.CustomerCenters;
import com.tasteshopping.inquiry.repository.CustomerCenterCategoriesRepository;
import com.tasteshopping.inquiry.repository.CustomerCenterRepository;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerCenterServiceImpl implements CustomerCenterService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerCenterCategoriesRepository customerCenterCategoriesRepository;

    @Autowired
    CustomerCenterRepository customerCenterRepository;
    @Override
    public List<CustomerCenterDto> getMyCustomerCenter(String email) {
        List<Optional<CustomerCenters>> l = customerCenterRepository.findByUserEmail(email);
        List<CustomerCenterDto> new_l = new ArrayList<>();
        for(int i=0;i<l.size();++i) {
            new_l.add(l.get(i).get().toDto());
        }
        return new_l;
    }

    @Override
    public List<CustomerCenterDto> getCustomerCenter() {
        List<CustomerCenters> l = customerCenterRepository.findAll();
        List<CustomerCenterDto> new_l = new ArrayList<>();
        for(int i=0;i<l.size();++i) {
            new_l.add(l.get(i).toDto());
        }
        return new_l;
    }

    @Override
    public CustomerCenterDto getCustomerCenterByUid(Integer uid) {
        Optional<CustomerCenters> customerCenters = customerCenterRepository.findById(uid);
        if(customerCenters.isPresent()){
            return customerCenters.get().toDto();
        }
        else{
            return null;
        }
    }

    @Override
    public void modifyCustomerCenterByUid(Integer uid, CustomerCenterWriteReqDto customerCenterWriteReqDto) {

        CustomerCenters customerCenter = customerCenterRepository.findById(uid).get();
        if(customerCenterWriteReqDto.getContent()!=null){
            customerCenter.setContent(customerCenterWriteReqDto.getContent());
        }
        if(customerCenterWriteReqDto.getTitle()!=null){
            customerCenter.setTitle(customerCenterWriteReqDto.getTitle());
        }
        if(customerCenterWriteReqDto.getImg_url()!=null){
            customerCenter.setImgUrl(customerCenterWriteReqDto.getImg_url());
        }
        if(customerCenterWriteReqDto.getStatus()!=null){
            customerCenter.setStatus(customerCenterWriteReqDto.getStatus());
        }
        if(customerCenterWriteReqDto.getCategory_uid()!=null){
            customerCenter.setCustomerCenterCategory(customerCenterCategoriesRepository.findById(customerCenterWriteReqDto.getCategory_uid()).get());
        }
        customerCenterRepository.save(customerCenter);
    }

    @Override
    public void createCustomerCenterByUid(String email, CustomerCenterWriteReqDto customerCenterWriteReqDto) {
        Optional<Users> usersOptional = userRepository.findByEmail(email);
        CustomerCenters customerCenter = new CustomerCenters();

        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String s = formatter.format(date).toString();
        try{
            date = formatter.parse(s);
        }
        catch(ParseException pErr){
            System.out.println(pErr);
        }
        customerCenter.setDate(date);
        customerCenter.setContent(customerCenterWriteReqDto.getContent());
        customerCenter.setTitle(customerCenterWriteReqDto.getTitle());
        customerCenter.setImgUrl(customerCenterWriteReqDto.getImg_url());
        customerCenter.setStatus(customerCenterWriteReqDto.getStatus());
        customerCenter.setCustomerCenterCategory(customerCenterCategoriesRepository.findById(customerCenterWriteReqDto.getCategory_uid()).get());
        customerCenterRepository.save(customerCenter);
    }



    @Override
    public void deleteCustomerCenterByUid(Integer uid){
        CustomerCenters customerCenter = customerCenterRepository.findById(uid).get();
        customerCenterRepository.delete(customerCenter);
    }

}
