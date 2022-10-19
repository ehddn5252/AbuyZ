package com.tasteshopping.review.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.review.dto.ReplyReqDto;
import com.tasteshopping.review.dto.ReviewReqDto;
import com.tasteshopping.review.dto.ReviewResDto;
import com.tasteshopping.review.entity.Likes;
import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.review.repository.LikeRepository;
import com.tasteshopping.review.repository.ReportRepository;
import com.tasteshopping.review.repository.ReviewRepository;
import com.tasteshopping.user.dto.Role;
import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ReportRepository reportRepository;


    @Override
    public BaseRes myReviewList() {
        return null;
    }

    @Override
    public BaseRes reviewWrite(String email, ReviewReqDto dto) {
//        상품과 회원 완료되면 변경
        Optional<Users> findUser = userRepository.findByEmail(email);
        Optional<Products> product = productRepository.findById(dto.getProduct_uid());
//        Reviews review = dto.toEntity(dto, findUser.get(), product);
//        임시 날짜
//        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//        Date date = new Date();
//        System.out.println("reviewWrite" + dateFormat.format(date));
//        Users user = userRepository.getReferenceById(1);
        Reviews review = dto.toEntity(dto, findUser.get(), product.get());
        reviewRepository.save(review);
        return new BaseRes(200,"리뷰 작성 성공", null);
    }

    @Override
    public BaseRes reviewDelete(String email, int review_uid) {
        Users user = userRepository.findByEmail(email).get();
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // 리뷰작성자와 유저가 같은지 확인
        if(user == target.getUser()){
            // 답글 삭제
            Reviews reply = reviewRepository.findByParentReview(target);
            if(reply != null) reviewRepository.delete(reply);
            // 도움이돼요 삭제
            List<Likes> likeList = likeRepository.findAllByReview(target);
            for (Likes like: likeList) {
                likeRepository.delete(like);
            }
            reviewRepository.delete(target);
            return new BaseRes(200,"리뷰 삭제 성공", null);
        }
        return new BaseRes(202,"리뷰 삭제 실패", null);
    }

    @Override
    public BaseRes reviewLike(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // 이미 좋아요 했는지 확인
        if(likeRepository.findByReviewAndUser(target,findUser.get()) !=null){
            return new BaseRes(202,"리뷰 도움이돼요 등록 실패 - 이미 좋아요 누름", null);
        }
        Likes like = Likes.builder()
                .review(target)
                .user(findUser.get())
                .build();
        likeRepository.save(like);
        return new BaseRes(200,"리뷰 도움이돼요 등록 성공", null);
    }

    @Override
    public BaseRes reviewLikeDelete(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews reviews = reviewRepository.getReferenceById(review_uid);
        Likes target = likeRepository.findByReviewAndUser(reviews,findUser.get());
        likeRepository.delete(target);
        return new BaseRes(200,"리뷰 도움이돼요 삭제 성공", null);
    }

    @Override
    public BaseRes reviewReply(String email, ReplyReqDto dto) {
        // 관리자인지 확인
        //        상품과 회원 완료되면 변경
        Optional<Users> findUser = userRepository.findByEmail(email);
        Products product = new Products();
//        Products product = productRepository.find~(product_uid);
        Reviews parent = reviewRepository.getReferenceById(dto.getReview_uid());
        Reviews review = dto.toEntity(dto, findUser.get(), product, parent);
        reviewRepository.save(review);
        return new BaseRes(200,"리뷰 답글 작성 성공", null);
    }

    @Override
    public BaseRes reviewReplyDelete(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Role role = findUser.get().getUserRoles();
        // 관리자인지 확인
        if(role != Role.ADMIN){
            return new BaseRes(202,"리뷰 답글 삭제 실패 - 관리자가 아님", null);
        }
        Reviews target = reviewRepository.getReferenceById(review_uid);
        reviewRepository.delete(target);
        return new BaseRes(200,"리뷰 답글 삭제 성공", null);
    }

    @Override
    public BaseRes productReviewList() {
        return null;
    }

    @Override
    public BaseRes reviewReport(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(review_uid);
        //이미 신고했는지 확인
        if(reportRepository.findByReviewAndUser(target, findUser.get()) != null){
            return new BaseRes(202,"리뷰 신고 실패 - 이미 신고함", null);
        }
        Reports report = Reports.builder()
                .review(target)
                .user(findUser.get())
                .build();
        reportRepository.delete(report);
        return new BaseRes(200,"리뷰 신고 성공", null);
    }
}
