package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOptions,Integer> {
    @Query(value="select max(uid) from ProductOptions")
    public Optional<Integer> getMaxUid();

    @Query(value="select * from product_options where products_uid=:productsUid",nativeQuery = true)
    public List<ProductOptions> findByProductsUid(Integer productsUid);

//    @Transactional
//    @Modifying
//    @Query(value=" delete from product_options where product_options_uid=:productsOptionsUid",nativeQuery = true)
//    void deleteByProductOptionsUid(int productsOptionsUid);


    @Query(value="select p from ProductOptions p where p.product.uid = :productsUid")
    List<Optional<ProductOptions>> findByProductsUid(int productsUid);

    @Query(value="delete from ProductOptions po where po.product.uid = :productUid")
    void deletByProduct(int productUid);

}
