package com.tasteshopping.review.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.inventory.repository.InventoryRepository;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.review.dto.PhotoResDto;
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
    private final OrderRepository orderRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductOptionRepository productOptionRepository;


    @Override
    public BaseRes reviewWrite(String email, ReviewReqDto dto, String imagePath) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Optional<Products> product = productRepository.findById(dto.getProduct_uid());
        Optional<Orders> order = orderRepository.findById(dto.getOrder_uid());
        // 이미 작성된 리뷰가 있는지 확인
        if(reviewRepository.existsByProductAndUser(product.get(),findUser.get())){
            return new BaseRes(204, "리뷰 작성 실패 - 이미 작성된 리뷰가 있음", null);
        }
        Reviews review = dto.toEntity(dto, findUser.get(), product.get(), imagePath, order.get());
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
        Reviews review = dto.toEntity(dto, findUser.get(), parent.getProduct(), parent);
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
        Page<Reviews> reviewPage = reviewRepository.findByProductAndParentReviewIsNull(products, PageRequest.of(page, 5));
        long totalCount = reviewPage.getTotalElements();
        long pageCount = reviewPage.getTotalPages();
        List<Reviews> reviewList = reviewPage.getContent();
        List<ReviewResDto> dtoList = new LinkedList<>();
        Optional<Users> findUser = userRepository.findByEmail(email); // 만약 로그인한사람이 존재하지 않는다면 좋아요 여부를 전부 false로
        boolean like = false;
        boolean reply;
        int likeCount = 0;
        if(findUser.isPresent()){
            // 로그인 O
            for (Reviews reviews : reviewList){
                // 옵션 찾기
                Orders orders = reviews.getOrder();
                List option = new ArrayList<HashMap<String,String>>();
                String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
                for(int i=0;i<optionUids.length;++i){
                    Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                    if(productOption.isPresent()){
                        String name = productOption.get().getName();
                        String value = productOption.get().getValue();
                        Map<String, Object> optionMap = new HashMap<>();
                        optionMap.put(name,value);
                        option.add(optionMap);
                    }else{
                        return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                    }
                }

                reply = false;
                // 좋아요 여부, 좋아요 개수
                if(likeRepository.existsByReviewAndUser(reviews, findUser.get())) like = true;
                likeCount = likeRepository.countByReview(reviews);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if(replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview, option));
            }
        }else{
            // 로그인 X
            for (Reviews reviews : reviewList){
                // 옵션 찾기
                Orders orders = reviews.getOrder();
                List option = new ArrayList<HashMap<String,String>>();
                String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
                for(int i=0;i<optionUids.length;++i){
                    Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                    if(productOption.isPresent()){
                        String name = productOption.get().getName();
                        String value = productOption.get().getValue();
                        Map<String, Object> optionMap = new HashMap<>();
                        optionMap.put(name,value);
                        option.add(optionMap);
                    }else{
                        return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                    }
                }

                reply = false;
                // 좋아요 여부-> false, 좋아요 개수
                likeCount = likeRepository.countByReview(reviews);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if(replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview, option));
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
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

    @Override
    public BaseRes productPhotoReview(int product_uid) {
        Products products = productRepository.getReferenceById(product_uid);
        Page<Reviews> reviewPage = reviewRepository.findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(products, PageRequest.of(0, 4));
        long totalCount = reviewPage.getTotalElements();
        List<Reviews> reviewList = reviewPage.getContent();
        List<PhotoResDto> dtoList = new LinkedList<>();
        for (Reviews review: reviewList) {
            dtoList.add(PhotoResDto.from(review));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("dto",dtoList);
        return new BaseRes(200, "상품 포토리뷰 조회(일부) 성공", map);
    }

    @Override
    public BaseRes productPhotosReview(int product_uid) {
        Products products = productRepository.getReferenceById(product_uid);
        List<Reviews> reviewList = reviewRepository.findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(products);
        List<PhotoResDto> dto = new LinkedList<>();
        for (Reviews review: reviewList) {
            dto.add(PhotoResDto.from(review));
        }
        return new BaseRes(200, "상품 포토리뷰 조회(전체) 성공", dto);
    }

    @Override
    public BaseRes productReviewDetail(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email); // 만약 로그인한사람이 존재하지 않는다면 좋아요 여부를 전부 false로
        Reviews review = reviewRepository.getReferenceById(review_uid);
        boolean like = false;
        boolean reply;
        int likeCount = 0;
        ReviewResDto dto;
        if(findUser.isPresent()){
            // 로그인 O
            // 옵션 찾기
            Orders orders = review.getOrder();
            List option = new ArrayList<HashMap<String,String>>();
            String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
            for(int i=0;i<optionUids.length;++i){
                Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                if(productOption.isPresent()){
                    String name = productOption.get().getName();
                    String value = productOption.get().getValue();
                    Map<String, Object> optionMap = new HashMap<>();
                    optionMap.put(name,value);
                    option.add(optionMap);
                }else{
                    return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                }
            }
                reply = false;
                // 좋아요 여부, 좋아요 개수
                if(likeRepository.existsByReviewAndUser(review, findUser.get())) like = true;
                likeCount = likeRepository.countByReview(review);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(review);
                if(replyReview != null) reply = true;
                dto = ReviewResDto.from(review, like, likeCount, reply, replyReview, option);

        }else{
            // 로그인 X
            // 옵션 찾기
            Orders orders = review.getOrder();
            List option = new ArrayList<HashMap<String,String>>();
            String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
            for(int i=0;i<optionUids.length;++i){
                Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                if(productOption.isPresent()){
                    String name = productOption.get().getName();
                    String value = productOption.get().getValue();
                    Map<String, Object> optionMap = new HashMap<>();
                    optionMap.put(name,value);
                    option.add(optionMap);
                }else{
                    return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                }
            }
            reply = false;
            // 좋아요 여부-> false, 좋아요 개수
            likeCount = likeRepository.countByReview(review);
            // 답글 존재여부, 답글 내용, 답글시간
            Reviews replyReview = reviewRepository.findByParentReview(review);
            if(replyReview != null) reply = true;
            dto = ReviewResDto.from(review, like, likeCount, reply, replyReview, option);
        }
        return new BaseRes(200, "상품 리뷰 상세보기 성공", dto);
    }
}
