package com.tasteshopping.review.repository;

import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ReportRepository extends JpaRepository<Reports, Integer> {
//    List<Likes> findAllByReview(Reviews review);
//    Likes findByReviewAndUser(Reviews review, Users user);
    Reports findByReviewAndUser(Reviews review, Users user);
    boolean existsByReviewAndUser(Reviews review, Users user);


//    @Query(value = "select * from reviews r where r.uid in (select reviews_uid from reports rp)", nativeQuery = true)
    @Query("select r from Reviews r " +
            "join fetch Users u on r.user = u " +
            "join fetch Products p on r.product = p " +
            "where r in (select rp.review from Reports rp) ")
    List<Reviews> findReportedReview();

//    @Query("select a from reports a where a.creationDateTime <= :creationDateTime")
//    List<Reports> findAllByDateAndReasonAndNameAndStatus();
    
}
