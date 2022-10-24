package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductKeywords;
import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
public interface ProductKeywordRepository extends JpaRepository<ProductKeywords,Integer> {

    @Transactional
    @Modifying
    @Query(value=" delete from product_keywords where products_uid=:productsUid",nativeQuery = true)
    void deleteByProductsUid(int productsUid);

    @Query(value = "select k.product from ProductKeywords as k where k.name in :keyword")
    List<Optional<Products>> findByParamInKeyword(String keyword);
}
