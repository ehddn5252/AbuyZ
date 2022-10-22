package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductOptionLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductOptionListRepository extends JpaRepository<ProductOptionLists,Integer> {

    @Transactional
    @Modifying
    @Query(value=" delete from product_option_lists where product_options_uid=:productsOptionsUid",nativeQuery = true)
    void deleteByProductOptionsUid(int productsOptionsUid);

    List<Optional<ProductOptionLists>> findByProductOptionsUid(int productsUid);
}
