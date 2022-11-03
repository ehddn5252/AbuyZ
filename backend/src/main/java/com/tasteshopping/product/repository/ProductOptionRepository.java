package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOptions,Integer> {
    @Query(value="select max(o.uid) from ProductOptions o")
    public Optional<Integer> getMaxUid();

    @Query(value="select * from product_options where products_uid=:productsUid",nativeQuery = true)
    public List<ProductOptions> findByProductsUid(Integer productsUid);

    @Query(value="select p from ProductOptions p where p.product.uid = :productsUid")
    List<Optional<ProductOptions>> findByProductsUid(int productsUid);
    @Transactional
    @Modifying
    @Query(value="delete from ProductOptions po where po.product.uid = :productUid")
    void deletByProduct(int productUid);


    @Query(value = "select o from ProductOptions o where o.name = :key and o.value = :value and o.product.uid=:productsUid")
    Optional<ProductOptions> findByKeyAndValueAndProductsUid(String key, String value, Integer productsUid);
}
