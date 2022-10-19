package com.tasteshopping.review.service;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.repository.ReviewRepository;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;


    @Override
    public List<Products> myReviewList() {
        return null;
    }

    @Override
    public boolean reviewWrite(String email, ReviewReqDto dto, int product_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
//        Products product = productRepository.find~(product_uid);
        Products product = new Products();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("reviewWrite" + dateFormat.format(date));
        Reviews review = dto.toEntity(dto, findUser.get(), product, date);
        reviewRepository.save(review);
        return true;
    }

    @Override
    public boolean reviewDelete() {
        return false;
    }

    @Override
    public boolean reviewLike() {
        return false;
    }

    @Override
    public boolean reviewLikeDelete() {
        return false;
    }

    @Override
    public boolean reviewReply() {
        return false;
    }

    @Override
    public boolean reviewReplyDelete() {
        return false;
    }

    @Override
    public List<ReviewResDto> productReviewList() {
        return null;
    }

    @Override
    public boolean reviewReport() {
        return false;
    }
}
