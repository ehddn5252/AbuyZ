package com.tasteshopping.review.repository;

import com.tasteshopping.review.entity.Likes;
import com.tasteshopping.review.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface LikeRepository extends JpaRepository<Likes, Integer> {
    List<Likes> findAllByReview(Reviews review);
}
