package com.tasteshopping.faq.repository;

import com.tasteshopping.faq.entity.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FAQRepository extends JpaRepository<FAQ,Integer> {

}
