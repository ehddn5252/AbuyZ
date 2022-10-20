package com.tasteshopping.review.repository;

import com.tasteshopping.review.entity.Reports;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
