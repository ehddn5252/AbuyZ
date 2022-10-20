package com.tasteshopping.review.repository;

import com.tasteshopping.review.entity.Likes;
import com.tasteshopping.review.entity.Reviews;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface LikeRepository extends JpaRepository<Likes, Integer> {
    List<Likes> findAllByReview(Reviews review);
    Likes findByReviewAndUser(Reviews review, Users user);
    boolean existsByReviewAndUser(Reviews review, Users user);

    //해당리뷰좋아요개수 count
    int countByReview(Reviews review);


}
