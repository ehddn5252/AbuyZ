package com.tasteshopping.review.repository;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Reviews, Integer> {
    Reviews findByParentReview(Reviews parentReview);
    Page<Reviews> findByProductAndParentReviewIsNull(Products product, Pageable pageable);
    boolean existsByParentReview(Reviews parentReview);
    boolean existsByProductAndUser(Products product, Users user);
    Page<Reviews> findByUser(Users user, Pageable pageable);
    Page<Reviews> findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(Products product, Pageable pageable);
    List<Reviews> findByProductAndImgUrlIsNotNullAndParentReviewIsNullOrderByUidDesc(Products product);

    @Query(value = "select r from Reviews r " +
            "join fetch Products p on r.product=p " +
            "join fetch SmallCategories sc on p.smallCategory= sc " +
            "join fetch BigCategories  bc on sc.bigCategory = bc " +
            "where p.smallCategory.bigCategory.uid = coalesce(:bigCategoriesUid,p.smallCategory.bigCategory.uid) " +
            "and p.smallCategory.uid = coalesce(:smallCategoriesUid,p.smallCategory.uid) " +
            "and p.name like :productName " +
            "and r.content like :content " +
            "and r.date between :startDate and :endDate")
    List<Reviews> findByDetailInfo(Integer bigCategoriesUid, Integer smallCategoriesUid, String productName, String content, Date startDate, Date endDate);

    @Query("select r from Reviews r where r.parentReview is null order by r.date desc")
    List<Reviews> findCurrent();

    List<Reviews> findByParentReviewIsNull();

    List<Reviews> findByParentReviewIsNotNull();


    @Query(value = "select rep from Reports rep " +
            "join fetch Reviews r on rep.review=r " +
            "join fetch  Products p on r.product=p " +
            "where p.name like :productName " +
            "and rep.status = coalesce(:status,rep.status) " +
            "and rep.reason = coalesce(:reasonId,rep.reason) " +
            "and rep.processDate between :startDate and :endDate")
//    @Query("select r from Reports r")
    List<Reports> findReportsBySearchCondition(String productName, Date startDate, Date endDate, int reasonId, Integer status);

    List<Reviews> findByProduct(Products products);
    List<Reviews> findByUserAndParentReviewIsNull(Users user);
}