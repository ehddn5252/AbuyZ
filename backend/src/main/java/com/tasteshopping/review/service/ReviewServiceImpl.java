package com.tasteshopping.review.service;

import com.tasteshopping.common.dto.BaseRes;
import com.tasteshopping.order.entity.Orders;
import com.tasteshopping.order.repository.OrderRepository;
import com.tasteshopping.product.entity.ProductOptions;
import com.tasteshopping.product.entity.Products;
import com.tasteshopping.product.repository.ProductOptionRepository;
import com.tasteshopping.product.repository.ProductRepository;
import com.tasteshopping.review.dto.*;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
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
    private final ProductOptionRepository productOptionRepository;


    @Override
    public BaseRes reviewWrite(String email, ReviewReqDto dto, String imagePath) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Optional<Products> product = productRepository.findById(dto.getProduct_uid());
        Optional<Orders> order = orderRepository.findById(dto.getOrder_uid());
        Reviews review = dto.toEntity(dto, findUser.get(), product.get(), imagePath, order.get());
//        product.get().addReview(review);
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
//        if (reviewRepository.existsByParentReview(parent)) {
//            return new BaseRes(204, "리뷰 답글 작성 실패 - 이미 답글 작성함", null);
//        }
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
        boolean like;
        boolean reply;
        int likeCount = 0;
        if (findUser.isPresent()) {
            // 로그인 O
            for (Reviews reviews : reviewList) {
                // 옵션 찾기
                Orders orders = reviews.getOrder();
                List option = new ArrayList<HashMap<String, String>>();
                String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
                for (int i = 0; i < optionUids.length; ++i) {
                    Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                    if (productOption.isPresent()) {
                        String name = productOption.get().getName();
                        String value = productOption.get().getValue();
                        Map<String, Object> optionMap = new HashMap<>();
                        optionMap.put(name, value);
                        option.add(optionMap);
                    } else {
                        return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                    }
                }
                like = false;
                reply = false;
                // 좋아요 여부, 좋아요 개수
                if (likeRepository.existsByReviewAndUser(reviews, findUser.get())) like = true;
                likeCount = likeRepository.countByReview(reviews);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if (replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview, option));
            }
        } else {
            // 로그인 X
            for (Reviews reviews : reviewList) {
                // 옵션 찾기
                Orders orders = reviews.getOrder();
                List option = new ArrayList<HashMap<String, String>>();
                String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
                for (int i = 0; i < optionUids.length; ++i) {
                    Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                    if (productOption.isPresent()) {
                        String name = productOption.get().getName();
                        String value = productOption.get().getValue();
                        Map<String, Object> optionMap = new HashMap<>();
                        optionMap.put(name, value);
                        option.add(optionMap);
                    } else {
                        return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                    }
                }
                like = false;
                reply = false;
                // 좋아요 여부-> false, 좋아요 개수
                likeCount = likeRepository.countByReview(reviews);
                // 답글 존재여부, 답글 내용, 답글시간
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if (replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview, option));
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt", totalCount);
        map.put("pageCnt", pageCount);
        map.put("dto", dtoList);
        return new BaseRes(200, "상품 리뷰 조회 성공", map);
    }

    @Override
    public BaseRes reviewReport(String email, ReportReqDto dto) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(dto.getReview_uid());
        //이미 신고했는지 확인
        if (reportRepository.existsByReviewAndUser(target, findUser.get())) {
            return new BaseRes(204, "리뷰 신고 실패 - 이미 신고함", null);
        }
        Reports report = dto.toEntity(target, findUser.get(), dto);
        reportRepository.save(report);
        return new BaseRes(200, "리뷰 신고 성공", null);
    }

    @Override
    public BaseRes productPhotoReview(int product_uid) {
        Products products = productRepository.getReferenceById(product_uid);
        Page<Reviews> reviewPage = reviewRepository.findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(products, PageRequest.of(0, 4));
        long totalCount = reviewPage.getTotalElements();
        List<Reviews> reviewList = reviewPage.getContent();
        List<PhotoResDto> dtoList = new LinkedList<>();
        for (Reviews review : reviewList) {
            dtoList.add(PhotoResDto.from(review));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt", totalCount);
        map.put("dto", dtoList);
        return new BaseRes(200, "상품 포토리뷰 조회(일부) 성공", map);
    }

    @Override
    public BaseRes productPhotosReview(int product_uid) {
        Products products = productRepository.getReferenceById(product_uid);
        List<Reviews> reviewList = reviewRepository.findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(products);
        List<PhotoResDto> dto = new LinkedList<>();
        for (Reviews review : reviewList) {
            dto.add(PhotoResDto.from(review));
        }
        return new BaseRes(200, "상품 포토리뷰 조회(전체) 성공", dto);
    }

    @Override
    public BaseRes productReviewDetail(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email); // 만약 로그인한사람이 존재하지 않는다면 좋아요 여부를 전부 false로
        Reviews review = reviewRepository.getReferenceById(review_uid);
        boolean like;
        boolean reply;
        int likeCount = 0;
        ReviewResDto dto;
        if (findUser.isPresent()) {
            // 로그인 O
            // 옵션 찾기
            Orders orders = review.getOrder();
            List option = new ArrayList<HashMap<String, String>>();
            String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
            for (int i = 0; i < optionUids.length; ++i) {
                Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                if (productOption.isPresent()) {
                    String name = productOption.get().getName();
                    String value = productOption.get().getValue();
                    Map<String, Object> optionMap = new HashMap<>();
                    optionMap.put(name, value);
                    option.add(optionMap);
                } else {
                    return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                }
            }
            like = false;
            reply = false;
            // 좋아요 여부, 좋아요 개수
            if (likeRepository.existsByReviewAndUser(review, findUser.get())) like = true;
            likeCount = likeRepository.countByReview(review);
            // 답글 존재여부, 답글 내용, 답글시간
            Reviews replyReview = reviewRepository.findByParentReview(review);
            if (replyReview != null) reply = true;
            dto = ReviewResDto.from(review, like, likeCount, reply, replyReview, option);

        } else {
            // 로그인 X
            // 옵션 찾기
            Orders orders = review.getOrder();
            List option = new ArrayList<HashMap<String, String>>();
            String[] optionUids = orders.getInventory().getProductOptionList().split(" ");
            for (int i = 0; i < optionUids.length; ++i) {
                Optional<ProductOptions> productOption = productOptionRepository.findById(Integer.parseInt(optionUids[i]));
                if (productOption.isPresent()) {
                    String name = productOption.get().getName();
                    String value = productOption.get().getValue();
                    Map<String, Object> optionMap = new HashMap<>();
                    optionMap.put(name, value);
                    option.add(optionMap);
                } else {
                    return new BaseRes(200, "상품 리뷰 조회 실패 - 옵션이 없음", null);
                }
            }
            like = false;
            reply = false;
            // 좋아요 여부-> false, 좋아요 개수
            likeCount = likeRepository.countByReview(review);
            // 답글 존재여부, 답글 내용, 답글시간
            Reviews replyReview = reviewRepository.findByParentReview(review);
            if (replyReview != null) reply = true;
            dto = ReviewResDto.from(review, like, likeCount, reply, replyReview, option);
        }
        return new BaseRes(200, "상품 리뷰 상세보기 성공", dto);
    }

    @Override
    @Transactional
    public List<ReviewSearchDto> searchByDetail(ReviewSearchReqDto reviewSearchReqDto) {
        /*
        DTO
        답변 유무, 평점, 제품명, 리뷰내용, 등록 일시, 답변 일시, 작성자
         */
        Integer bigCategoriesUid = reviewSearchReqDto.getBigCategoryUid();
        Integer smallCategoriesUid = reviewSearchReqDto.getSmallCategoryUid();
        String productName = reviewSearchReqDto.getProductName();
        String content = reviewSearchReqDto.getContent();
        Date startDate = reviewSearchReqDto.getStartDate();
        Date endDate = reviewSearchReqDto.getEndDate();
        Integer isAnswered = reviewSearchReqDto.getIsAnswered();

        // 여기에서 NULL 이면 NULL 처리를 못하게 해야 한다.
        if (productName == null) {
            productName = "%%";
        } else {
            productName = "%" + productName + "%";
        }
        if (content == null) {
            content = "%%";
        } else {
            content = "%" + content + "%";
        }
        if (endDate == null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                endDate = format.parse("2300-1-1");
            } catch (Exception e) {
            }
        }
        if (startDate == null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                startDate = format.parse("1900-1-1");
            } catch (Exception e) {
            }
        }
        // 답변단 것인지 안 단 것인지 확인한다.Review
        List<Reviews> filteredReviews = reviewRepository.findByDetailInfo(bigCategoriesUid, smallCategoriesUid, productName, content, startDate, endDate);

        List<ReviewSearchDto> allAnswerReviewDtos = new ArrayList<>();
        List<ReviewSearchDto> noAnswerReviewDtos = new ArrayList<>();
        List<ReviewSearchDto> answerReviewDtos = new ArrayList<>();
        //로직
        //1. 위의 조건에서 거른 것전체 검색
        //2. 2중 for 문 바깥 for 문은 전체 하나씩 검사
        // 3. 안쪽에 있는 parent의 uid를 검사하여서 만약에 동일하다면 답변이 있는 review, 아니라면 답변이 없는 리뷰

        for (int i = 0; i < filteredReviews.size(); ++i) {
            boolean isBreak = false;
            if (filteredReviews.get(i).getParentReview() == null) {
                for (int j = 0; j < filteredReviews.size(); ++j) {
                    if (filteredReviews.get(j).getParentReview() != null) {
                        // 답변
                        if (filteredReviews.get(i).getUid() == filteredReviews.get(j).getParentReview().getUid()) {
                            ReviewSearchDto reviewSearchDto = filteredReviews.get(i).toReviewSearchDto();
                            reviewSearchDto.setAnswered(true);
                            reviewSearchDto.setAnswerDate(filteredReviews.get(j).getDate());
                            reviewSearchDto.setReply(filteredReviews.get(j).getContent());
                            answerReviewDtos.add(reviewSearchDto);
                            allAnswerReviewDtos.add(reviewSearchDto);
                            isBreak=true;
                            break;
                        }
                    }
                }
                if(!isBreak) {
                    ReviewSearchDto reviewSearchDto = filteredReviews.get(i).toReviewSearchDto();
                    reviewSearchDto.setAnswered(false);
                    reviewSearchDto.setAnswerDate(null);
                    noAnswerReviewDtos.add(reviewSearchDto);
                    allAnswerReviewDtos.add(reviewSearchDto);
                }
            }
        }
        if (isAnswered == 1) {
            return noAnswerReviewDtos;
        } else if (isAnswered == 2) {
            return answerReviewDtos;
        } else {
            return allAnswerReviewDtos;
        }
    }

    @Override
    public BaseRes searchReport(ReportSearchReqDto reportSearchReqDto) {
        String productName = reportSearchReqDto.getProductName();
        Integer status = reportSearchReqDto.getStatus(); // 신고 해결 유무 ( 0:대기, 1:거절, 2:승인, 3:전체)
        Integer reasonId = reportSearchReqDto.getReasonId(); // 신고 사유 ( 0:허위사실유포, 1:욕설)
        Date startDate = reportSearchReqDto.getStartDate();
        Date endDate = reportSearchReqDto.getEndDate();

        // 여기에서 NULL 이면 NULL 처리를 못하게 해야 한다.
        if (productName == null) {
            productName = "%%";
        } else {
            productName = "%" + productName + "%";
        }

        if (endDate == null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                endDate = format.parse("2300-1-1");
            } catch (Exception e) {
            }
        }
        if (startDate == null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                startDate = format.parse("1900-1-1");
            } catch (Exception e) {
            }
        }
        if(status==3){
            status=null;
        }
        List<Reports> l = reviewRepository.findReportsBySearchCondition(productName,startDate,endDate,reasonId,status);

        // reason이 null이면 collase
//        List<Reports> l = reviewRepository.findReportsByDetailInfo2(productName,startDate,endDate);
        List<ReportSearchResDto> newL = new ArrayList<>();
        for(int i=0;i<l.size();++i){
            newL.add(l.get(i).toSearchResDto());
        }
        return new BaseRes(200,"search 성공",newL);
    }

    @Override
    public BaseRes getReportedReview(int review_uid) {
        Reviews review = reviewRepository.findById(review_uid).get();
        return new BaseRes(200,"리뷰 가져오기 성공",review.toDto());
    }

    @Override
    public BaseRes setStatus(ReportStatusReqDto reportStatusReqDto) {
        Reports reports = reportRepository.findById(reportStatusReqDto.getReportsUid()).get();
        reports.update(reportStatusReqDto.getStatus());
        return new BaseRes(200,"상태 변경 성공",null);
    }

    @Override
    public BaseRes getAllReportedReview() {
        List<Reviews> l =  reportRepository.findReportedReview();
        List<ReviewSearchDto> newL = new ArrayList<>();

        for(int i=0;i<l.size();++i){
            newL.add(l.get(i).toReviewSearchDto());
        }
        return new BaseRes(200,"신고한 리뷰 가져오기 성공",newL);
    }

    @Override
    public BaseRes myReviewList(String email) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        List<Reviews> reviewPage = reviewRepository.findByUserAndParentReviewIsNull(findUser.get());
        List<MyReviewResDto> resultList = new ArrayList<>();
        boolean answered;
        for (Reviews review: reviewPage) {
            answered = false;
            Reviews reply = reviewRepository.findByParentReview(review);
            if(reply !=null) answered = true;
            resultList.add(MyReviewResDto.from(review, reply, findUser.get(), answered));
        }
        return new BaseRes(200, "내 리뷰 내역 조회 성공", resultList);
    }


}
