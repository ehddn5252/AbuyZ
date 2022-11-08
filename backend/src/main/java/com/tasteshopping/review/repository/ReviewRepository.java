package com.tasteshopping.review.repository;

import com.tasteshopping.product.entity.Products;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
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


    @Query("select r from Reviews r where r.parentReview is null order by r.date desc")
    List<Reviews> findCurrent();

    List<Reviews> findByParentReviewIsNull();

    List<Reviews> findByParentReviewIsNotNull();
}
