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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public BaseRes myReviewList(String email, int page) {
        // 찜한상품목록완료되면 그거대로~
        Optional<Users> findUser = userRepository.findByEmail(email);
        Page<Reviews> reviewPage = reviewRepository.findByUser(findUser.get(),PageRequest.of(page, 5));
        long totalCount = reviewPage.getTotalElements();
        long pageCount = reviewPage.getTotalPages();
        List<Reviews> reviewList = reviewPage.getContent();



        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
//        map.put("sum",sum);
//        map.put("avg",sum/totalCount);
//        map.put("dto",dtoList);
        return new BaseRes(200, "내 리뷰 내역 조회 성공!이라고 할뻔~", map);
    }

    @Override
    public BaseRes reviewWrite(String email, ReviewReqDto dto, String imagePath) {
        // 상품과 회원 완료되면 변경
        Optional<Users> findUser = userRepository.findByEmail(email);
        Optional<Products> product = productRepository.findById(dto.getProduct_uid());
        // 이미 작성된 리뷰가 있는지 확인
        if(reviewRepository.existsByProductAndUser(product.get(),findUser.get())){
            return new BaseRes(204, "리뷰 작성 실패 - 이미 작성된 리뷰가 있음", null);
        }
        // 구매이력이 있는지 확인 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        Reviews review = dto.toEntity(dto, findUser.get(), product.get(), imagePath);
        reviewRepository.save(review);
        return new BaseRes(200, "리뷰 작성 성공", null);
    }

    @Override
    public BaseRes reviewDelete(String email, int review_uid) {
        Users user = userRepository.findByEmail(email).get();
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // 리뷰작성자와 유저가 같은지 확인
        if (user == target.getUser()) {
            // 답글 삭제
            Reviews reply = reviewRepository.findByParentReview(target);
            if (reply != null) reviewRepository.delete(reply);
            // 도움이돼요 삭제
            List<Likes> likeList = likeRepository.findAllByReview(target);
            for (Likes like : likeList) {
                likeRepository.delete(like);
            }
            reviewRepository.delete(target);
            return new BaseRes(200, "리뷰 삭제 성공", null);
        }
        return new BaseRes(204, "리뷰 삭제 실패", null);
    }

    @Override
    public BaseRes reviewLike(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // 이미 좋아요 했는지 확인
        if (likeRepository.existsByReviewAndUser(target, findUser.get())) {
            return new BaseRes(204, "리뷰 도움이돼요 등록 실패 - 이미 좋아요 누름", null);
        }
        Likes like = Likes.builder()
                .review(target)
                .user(findUser.get())
                .build();
        likeRepository.save(like);
        return new BaseRes(200, "리뷰 도움이돼요 등록 성공", null);
    }

    @Override
    public BaseRes reviewLikeDelete(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews reviews = reviewRepository.getReferenceById(review_uid);
        Likes target = likeRepository.findByReviewAndUser(reviews, findUser.get());
        likeRepository.delete(target);
        return new BaseRes(200, "리뷰 도움이돼요 삭제 성공", null);
    }

    @Override
    public BaseRes reviewReply(String email, ReplyReqDto dto) {
        // 상품과 회원 완료되면 변경
        Optional<Users> findUser = userRepository.findByEmail(email);
        Role role = findUser.get().getUserRoles();
        // 관리자인지 확인
        if (role != Role.ADMIN) {
            return new BaseRes(204, "리뷰 답글 작성 실패 - 관리자가 아님", null);
        }
        // 이미 작성했는지 확인
        Reviews parent = reviewRepository.getReferenceById(dto.getReview_uid());
        if (reviewRepository.existsByParentReview(parent)){
            return new BaseRes(204, "리뷰 답글 작성 실패 - 이미 답글 작성함", null);
        }
        Products product = new Products();
//        Products product = productRepository.find~(product_uid); 수정@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Reviews review = dto.toEntity(dto, findUser.get(), product, parent);
        reviewRepository.save(review);
        return new BaseRes(200, "리뷰 답글 작성 성공", null);
    }

    @Override
    public BaseRes reviewReplyDelete(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Role role = findUser.get().getUserRoles();
        // 관리자인지 확인
        if (role != Role.ADMIN) {
            return new BaseRes(204, "리뷰 답글 삭제 실패 - 관리자가 아님", null);
        }
        Reviews target = reviewRepository.getReferenceById(review_uid);
        reviewRepository.delete(target);
        return new BaseRes(200, "리뷰 답글 삭제 성공", null);
    }

    @Override
    public BaseRes productReviewList(String email, int product_uid, int page) {
        Products products = productRepository.getReferenceById(product_uid);
        Page<Reviews> reviewPage = reviewRepository.findByProduct(products, PageRequest.of(page, 5));
        long totalCount = reviewPage.getTotalElements();
        long pageCount = reviewPage.getTotalPages();
        List<Reviews> reviewList = reviewPage.getContent();
        List<ReviewResDto> dtoList = new LinkedList<>();
        Optional<Users> findUser = userRepository.findByEmail(email); // 만약 로그인한사람이 존재하지 않는다면 좋아요 여부를 전부 false로
        boolean like = false;
        boolean reply = false;
        int likeCount = 0;
//        float sum = 0.0f;
        if(findUser.isPresent()){
            // 로그인 O
            for (Reviews reviews : reviewList){
                // 좋아요 여부, 좋아요 개수
                if(likeRepository.existsByReviewAndUser(reviews, findUser.get())) like = true;
                likeCount = likeRepository.countByReview(reviews);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if(replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview));
            }
        }else{
            // 로그인 X
            for (Reviews reviews : reviewList){
                // 좋아요 여부-> false, 좋아요 개수
                likeCount = likeRepository.countByReview(reviews);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if(replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview));
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
//        map.put("sum",sum);
//        map.put("avg",sum/totalCount);
        map.put("dto",dtoList);
        return new BaseRes(200, "상품 리뷰 조회 성공", map);
    }

    @Override
    public BaseRes reviewReport(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(review_uid);
        //이미 신고했는지 확인
        if (reportRepository.existsByReviewAndUser(target, findUser.get())) {
            return new BaseRes(204, "리뷰 신고 실패 - 이미 신고함", null);
        }
        Reports report = Reports.builder()
                .review(target)
                .user(findUser.get())
                .build();
        reportRepository.delete(report);
        return new BaseRes(200, "리뷰 신고 성공", null);
    }
}
