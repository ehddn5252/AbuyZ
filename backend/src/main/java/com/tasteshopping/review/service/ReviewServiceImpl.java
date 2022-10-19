package com.tasteshopping.review.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.entity.Likes;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.repository.LikeRepository;
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
    private final LikeRepository likeRepository;


    @Override
    public BaseRes myReviewList() {
        return null;
    }

    @Override
    public BaseRes reviewWrite(String email, ReviewReqDto dto) {
//        상품과 회원 완료되면 변경
//        Optional<Users> findUser = userRepository.findByEmail(email);
//        Products product = productRepository.find~(product_uid);
//        Reviews review = dto.toEntity(dto, findUser.get(), product);
        Products product = new Products();
//        임시 날짜
//        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//        Date date = new Date();
//        System.out.println("reviewWrite" + dateFormat.format(date));
        Users user = userRepository.getReferenceById(1);
        Reviews review = dto.toEntity(dto, user, product);
        Reviews result = reviewRepository.save(review);
        BaseRes res = new BaseRes(200,"리뷰 작성 성공", null);
        return res;
    }

    @Override
    public BaseRes reviewDelete(int review_uid) {
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // 답글 삭제
        Reviews reply = reviewRepository.findByParentReview(target);
        if(reply != null) reviewRepository.delete(reply);
        // 도움이돼요 삭제
        List<Likes> likeList = likeRepository.findAllByReview(target);
        for (Likes like: likeList) {
            likeRepository.delete(like);
        }
        return new BaseRes(200,"리뷰 삭제 성공", null);
    }

    @Override
    public BaseRes reviewLike() {
        return new BaseRes();
    }

    @Override
    public BaseRes reviewLikeDelete() {
        return new BaseRes();
    }

    @Override
    public BaseRes reviewReply() {
        return new BaseRes();
    }

    @Override
    public BaseRes reviewReplyDelete() {
        return new BaseRes();
    }

    @Override
    public BaseRes productReviewList() {
        return null;
    }

    @Override
    public BaseRes reviewReport() {
        return new BaseRes();
    }
}
