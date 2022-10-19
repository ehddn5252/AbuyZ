package com.tasteshopping.review.repository;

import com.tasteshopping.review.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Reviews, Integer> {
    Reviews findByParentReview(Reviews parentReview);
}
