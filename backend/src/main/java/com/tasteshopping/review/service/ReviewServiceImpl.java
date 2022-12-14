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
        return new BaseRes(200, "?????? ?????? ??????", null);
    }

    @Override
    public BaseRes reviewDelete(String email, int review_uid) {
        Users user = userRepository.findByEmail(email).get();
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // ?????????????????? ????????? ????????? ??????
        if (user == target.getUser()) {
            // ?????? ??????
            Reviews reply = reviewRepository.findByParentReview(target);
            if (reply != null) reviewRepository.delete(reply);
            // ??????????????? ??????
            List<Likes> likeList = likeRepository.findAllByReview(target);
            for (Likes like : likeList) {
                likeRepository.delete(like);
            }
            reviewRepository.delete(target);
            return new BaseRes(200, "?????? ?????? ??????", null);
        }
        return new BaseRes(204, "?????? ?????? ??????", null);
    }

    @Override
    public BaseRes reviewLike(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(review_uid);
        // ?????? ????????? ????????? ??????
        if (likeRepository.existsByReviewAndUser(target, findUser.get())) {
            return new BaseRes(204, "?????? ??????????????? ?????? ?????? - ?????? ????????? ??????", null);
        }
        Likes like = Likes.builder()
                .review(target)
                .user(findUser.get())
                .build();
        likeRepository.save(like);
        return new BaseRes(200, "?????? ??????????????? ?????? ??????", null);
    }

    @Override
    public BaseRes reviewLikeDelete(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews reviews = reviewRepository.getReferenceById(review_uid);
        Likes target = likeRepository.findByReviewAndUser(reviews, findUser.get());
        likeRepository.delete(target);
        return new BaseRes(200, "?????? ??????????????? ?????? ??????", null);
    }

    @Override
    public BaseRes reviewReply(String email, ReplyReqDto dto) {
        // ????????? ?????? ???????????? ??????
        Optional<Users> findUser = userRepository.findByEmail(email);
        Role role = findUser.get().getUserRoles();
        // ??????????????? ??????
        if (role != Role.ADMIN) {
            return new BaseRes(204, "?????? ?????? ?????? ?????? - ???????????? ??????", null);
        }
        // ?????? ??????????????? ??????
        Reviews parent = reviewRepository.getReferenceById(dto.getReview_uid());
//        if (reviewRepository.existsByParentReview(parent)) {
//            return new BaseRes(204, "?????? ?????? ?????? ?????? - ?????? ?????? ?????????", null);
//        }
        Reviews review = dto.toEntity(dto, findUser.get(), parent.getProduct(), parent);
        reviewRepository.save(review);
        return new BaseRes(200, "?????? ?????? ?????? ??????", null);
    }

    @Override
    public BaseRes reviewReplyDelete(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Role role = findUser.get().getUserRoles();
        // ??????????????? ??????
        if (role != Role.ADMIN) {
            return new BaseRes(204, "?????? ?????? ?????? ?????? - ???????????? ??????", null);
        }
        Reviews target = reviewRepository.getReferenceById(review_uid);
        reviewRepository.delete(target);
        return new BaseRes(200, "?????? ?????? ?????? ??????", null);
    }

    @Override
    public BaseRes productReviewList(String email, int product_uid, int page) {
        Products products = productRepository.getReferenceById(product_uid);
        Page<Reviews> reviewPage = reviewRepository.findByProductAndParentReviewIsNull(products, PageRequest.of(page, 5));
        long totalCount = reviewPage.getTotalElements();
        long pageCount = reviewPage.getTotalPages();
        List<Reviews> reviewList = reviewPage.getContent();
        List<ReviewResDto> dtoList = new LinkedList<>();
        Optional<Users> findUser = userRepository.findByEmail(email); // ?????? ????????????????????? ???????????? ???????????? ????????? ????????? ?????? false???
        boolean like;
        boolean reply;
        int likeCount = 0;
        if (findUser.isPresent()) {
            // ????????? O
            for (Reviews reviews : reviewList) {
                // ?????? ??????
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
                        return new BaseRes(200, "?????? ?????? ?????? ?????? - ????????? ??????", null);
                    }
                }
                like = false;
                reply = false;
                // ????????? ??????, ????????? ??????
                if (likeRepository.existsByReviewAndUser(reviews, findUser.get())) like = true;
                likeCount = likeRepository.countByReview(reviews);
                // ?????? ????????????, ?????? ??????, ????????????
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if (replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview, option));
            }
        } else {
            // ????????? X
            for (Reviews reviews : reviewList) {
                // ?????? ??????
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
                        return new BaseRes(200, "?????? ?????? ?????? ?????? - ????????? ??????", null);
                    }
                }
                like = false;
                reply = false;
                // ????????? ??????-> false, ????????? ??????
                likeCount = likeRepository.countByReview(reviews);
                // ?????? ????????????, ?????? ??????, ????????????
                Reviews replyReview = reviewRepository.findByParentReview(reviews);
                if (replyReview != null) reply = true;
                dtoList.add(ReviewResDto.from(reviews, like, likeCount, reply, replyReview, option));
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt", totalCount);
        map.put("pageCnt", pageCount);
        map.put("dto", dtoList);
        return new BaseRes(200, "?????? ?????? ?????? ??????", map);
    }

    @Override
    public BaseRes reviewReport(String email, ReportReqDto dto) {
        Optional<Users> findUser = userRepository.findByEmail(email);
        Reviews target = reviewRepository.getReferenceById(dto.getReview_uid());
        //?????? ??????????????? ??????
        if (reportRepository.existsByReviewAndUser(target, findUser.get())) {
            return new BaseRes(204, "?????? ?????? ?????? - ?????? ?????????", null);
        }
        Reports report = dto.toEntity(target, findUser.get(), dto);
        reportRepository.save(report);
        return new BaseRes(200, "?????? ?????? ??????", null);
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
        return new BaseRes(200, "?????? ???????????? ??????(??????) ??????", map);
    }

    @Override
    public BaseRes productPhotosReview(int product_uid) {
        Products products = productRepository.getReferenceById(product_uid);
        List<Reviews> reviewList = reviewRepository.findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(products);
        List<PhotoResDto> dto = new LinkedList<>();
        for (Reviews review : reviewList) {
            dto.add(PhotoResDto.from(review));
        }
        return new BaseRes(200, "?????? ???????????? ??????(??????) ??????", dto);
    }

    @Override
    public BaseRes productReviewDetail(String email, int review_uid) {
        Optional<Users> findUser = userRepository.findByEmail(email); // ?????? ????????????????????? ???????????? ???????????? ????????? ????????? ?????? false???
        Reviews review = reviewRepository.getReferenceById(review_uid);
        boolean like;
        boolean reply;
        int likeCount = 0;
        ReviewResDto dto;
        if (findUser.isPresent()) {
            // ????????? O
            // ?????? ??????
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
                    return new BaseRes(200, "?????? ?????? ?????? ?????? - ????????? ??????", null);
                }
            }
            like = false;
            reply = false;
            // ????????? ??????, ????????? ??????
            if (likeRepository.existsByReviewAndUser(review, findUser.get())) like = true;
            likeCount = likeRepository.countByReview(review);
            // ?????? ????????????, ?????? ??????, ????????????
            Reviews replyReview = reviewRepository.findByParentReview(review);
            if (replyReview != null) reply = true;
            dto = ReviewResDto.from(review, like, likeCount, reply, replyReview, option);

        } else {
            // ????????? X
            // ?????? ??????
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
                    return new BaseRes(200, "?????? ?????? ?????? ?????? - ????????? ??????", null);
                }
            }
            like = false;
            reply = false;
            // ????????? ??????-> false, ????????? ??????
            likeCount = likeRepository.countByReview(review);
            // ?????? ????????????, ?????? ??????, ????????????
            Reviews replyReview = reviewRepository.findByParentReview(review);
            if (replyReview != null) reply = true;
            dto = ReviewResDto.from(review, like, likeCount, reply, replyReview, option);
        }
        return new BaseRes(200, "?????? ?????? ???????????? ??????", dto);
    }

    @Override
    @Transactional
    public List<ReviewSearchDto> searchByDetail(ReviewSearchReqDto reviewSearchReqDto) {
        /*
        DTO
        ?????? ??????, ??????, ?????????, ????????????, ?????? ??????, ?????? ??????, ?????????
         */
        Integer bigCategoriesUid = reviewSearchReqDto.getBigCategoryUid();
        Integer smallCategoriesUid = reviewSearchReqDto.getSmallCategoryUid();
        String productName = reviewSearchReqDto.getProductName();
        String content = reviewSearchReqDto.getContent();
        Date startDate = reviewSearchReqDto.getStartDate();
        Date endDate = reviewSearchReqDto.getEndDate();
        Integer isAnswered = reviewSearchReqDto.getIsAnswered();

        // ???????????? NULL ?????? NULL ????????? ????????? ?????? ??????.
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
        // ????????? ????????? ??? ??? ????????? ????????????.Review
        List<Reviews> filteredReviews = reviewRepository.findByDetailInfo(bigCategoriesUid, smallCategoriesUid, productName, content, startDate, endDate);
        List<Reviews> allReviews = reviewRepository.findAll();

        List<ReviewSearchDto> allAnswerReviewDtos = new ArrayList<>();
        List<ReviewSearchDto> noAnswerReviewDtos = new ArrayList<>();
        List<ReviewSearchDto> answerReviewDtos = new ArrayList<>();
        //??????
        //1. ?????? ???????????? ?????? ????????? ??????
        //2. 2??? for ??? ?????? for ?????? ?????? ????????? ??????
        // 3. ????????? ?????? parent??? uid??? ??????????????? ????????? ??????????????? ????????? ?????? review, ???????????? ????????? ?????? ??????

        for (int i = 0; i < filteredReviews.size(); ++i) {
            boolean isBreak = false;
            if (filteredReviews.get(i).getParentReview() == null) {
                for (int j = 0; j < allReviews.size(); ++j) {
                    if (allReviews.get(j).getParentReview() != null) {
                        // ??????
                        if (filteredReviews.get(i).getUid() == allReviews.get(j).getParentReview().getUid()) {
                            ReviewSearchDto reviewSearchDto = filteredReviews.get(i).toReviewSearchDto();
                            reviewSearchDto.setAnswered(true);
                            reviewSearchDto.setAnswerDate(allReviews.get(j).getDate());
                            reviewSearchDto.setReply(allReviews.get(j).getContent());
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

//    @Override
//    @Transactional
//    public List<ReviewSearchDto> searchByDetail(ReviewSearchReqDto reviewSearchReqDto) {
//        /*
//        DTO
//        ?????? ??????, ??????, ?????????, ????????????, ?????? ??????, ?????? ??????, ?????????
//         */
//        Integer bigCategoriesUid = reviewSearchReqDto.getBigCategoryUid();
//        Integer smallCategoriesUid = reviewSearchReqDto.getSmallCategoryUid();
//        String productName = reviewSearchReqDto.getProductName();
//        String content = reviewSearchReqDto.getContent();
//        Date startDate = reviewSearchReqDto.getStartDate();
//        Date endDate = reviewSearchReqDto.getEndDate();
//        Integer isAnswered = reviewSearchReqDto.getIsAnswered();
//
//        // ???????????? NULL ?????? NULL ????????? ????????? ?????? ??????.
//        if (productName == null) {
//            productName = "%%";
//        } else {
//            productName = "%" + productName + "%";
//        }
//        if (content == null) {
//            content = "%%";
//        } else {
//            content = "%" + content + "%";
//        }
//        if (endDate == null) {
//            try {
//                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//                endDate = format.parse("2300-1-1");
//            } catch (Exception e) {
//            }
//        }
//        if (startDate == null) {
//            try {
//                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//                startDate = format.parse("1900-1-1");
//            } catch (Exception e) {
//            }
//        }
//        // ????????? ????????? ??? ??? ????????? ????????????.Review
//        List<Reviews> filteredReviews = reviewRepository.findByDetailInfo(bigCategoriesUid, smallCategoriesUid, productName, content, startDate, endDate);
//
//        List<ReviewSearchDto> allAnswerReviewDtos = new ArrayList<>();
//        List<ReviewSearchDto> noAnswerReviewDtos = new ArrayList<>();
//        List<ReviewSearchDto> answerReviewDtos = new ArrayList<>();
//        //??????
//        //1. ?????? ???????????? ?????? ????????? ??????
//        //2. 2??? for ??? ?????? for ?????? ?????? ????????? ??????
//        // 3. ????????? ?????? parent??? uid??? ??????????????? ????????? ??????????????? ????????? ?????? review, ???????????? ????????? ?????? ??????
//
//        for (int i = 0; i < filteredReviews.size(); ++i) {
//            boolean isBreak = false;
//            if (filteredReviews.get(i).getParentReview() == null) {
//                for (int j = 0; j < filteredReviews.size(); ++j) {
//                    if (filteredReviews.get(j).getParentReview() != null) {
//                        // ??????
//                        if (filteredReviews.get(i).getUid() == filteredReviews.get(j).getParentReview().getUid()) {
//                            ReviewSearchDto reviewSearchDto = filteredReviews.get(i).toReviewSearchDto();
//                            reviewSearchDto.setAnswered(true);
//                            reviewSearchDto.setAnswerDate(filteredReviews.get(j).getDate());
//                            reviewSearchDto.setReply(filteredReviews.get(j).getContent());
//                            answerReviewDtos.add(reviewSearchDto);
//                            allAnswerReviewDtos.add(reviewSearchDto);
//                            isBreak=true;
//                            break;
//                        }
//                    }
//                }
//                if(!isBreak) {
//                    ReviewSearchDto reviewSearchDto = filteredReviews.get(i).toReviewSearchDto();
//                    reviewSearchDto.setAnswered(false);
//                    reviewSearchDto.setAnswerDate(null);
//                    noAnswerReviewDtos.add(reviewSearchDto);
//                    allAnswerReviewDtos.add(reviewSearchDto);
//                }
//            }
//        }
//        if (isAnswered == 1) {
//            return noAnswerReviewDtos;
//        } else if (isAnswered == 2) {
//            return answerReviewDtos;
//        } else {
//            return allAnswerReviewDtos;
//        }
//    }

    @Override
    public BaseRes searchReport(ReportSearchReqDto reportSearchReqDto) {
        String productName = reportSearchReqDto.getProductName();
        Integer status = reportSearchReqDto.getStatus(); // ?????? ?????? ?????? ( 0:??????, 1:??????, 2:??????, 3:??????)
        Integer reasonId = reportSearchReqDto.getReasonId(); // ?????? ?????? ( 0:??????????????????, 1:??????)
        Date startDate = reportSearchReqDto.getStartDate();
        Date endDate = reportSearchReqDto.getEndDate();

        // ???????????? NULL ?????? NULL ????????? ????????? ?????? ??????.
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

        // reason??? null?????? collase
//        List<Reports> l = reviewRepository.findReportsByDetailInfo2(productName,startDate,endDate);
        List<ReportSearchResDto> newL = new ArrayList<>();
        for(int i=0;i<l.size();++i){
            newL.add(l.get(i).toSearchResDto());
        }
        return new BaseRes(200,"search ??????",newL);
    }

    @Override
    public BaseRes getReportedReview(int review_uid) {
        Reviews review = reviewRepository.findById(review_uid).get();
        return new BaseRes(200,"?????? ???????????? ??????",review.toDto());
    }

    @Override
    public BaseRes setStatus(ReportStatusReqDto reportStatusReqDto) {
        Reports reports = reportRepository.findById(reportStatusReqDto.getReportsUid()).get();
        reports.update(reportStatusReqDto.getStatus());
        return new BaseRes(200,"?????? ?????? ??????",null);
    }

    @Override
    public BaseRes getAllReportedReview() {
        List<Reviews> l =  reportRepository.findReportedReview();
        List<ReviewSearchDto> newL = new ArrayList<>();

        for(int i=0;i<l.size();++i){
            newL.add(l.get(i).toReviewSearchDto());
        }
        return new BaseRes(200,"????????? ?????? ???????????? ??????",newL);
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
        return new BaseRes(200, "??? ?????? ?????? ?????? ??????", resultList);
    }


}
