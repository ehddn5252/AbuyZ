package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductPictures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
public interface ProductPictureRepository extends JpaRepository<ProductPictures,Integer> {

    @Transactional
    @Modifying
    @Query(value=" delete from product_pictures where products_uid=:productsUid",nativeQuery = true)
    void deleteByProductsUid(int productsUid);

    List<Optional<ProductPictures>> findByProductUid(int productsUid);
}
