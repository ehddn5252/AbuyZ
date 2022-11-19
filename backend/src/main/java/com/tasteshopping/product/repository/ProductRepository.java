package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {


//    @Query(value = "select p from Products p " +
//            "join fetch SmallCategories sc on p.smallCategory = sc " +
//            "join fetch BigCategories  bc on sc.bigCategory = bc " +
//            "join fetch ProductOptions po on  = po " +
//            "join fetch ProductPictures pp on p.productPictures = pp ")
//    Optional<Integer> findByIdFetchJoin();

    @Query("select distinct(p) from Products p join fetch Brands b on p.brand = b left join fetch ProductPictures pp on p=pp.product join fetch Inventories i on p= i.product join fetch p.productOptions po where p.uid=:uid ")
    Optional<Products> findByIdFetchJoin(int uid);

    @Query("select p from Products p  join fetch SmallCategories s on p.smallCategory=s join fetch BigCategories b on s.bigCategory=b where b.uid=:categoriesUid")
    List<Optional<Products>> findByBigCategory(int categoriesUid);

    @Query("select p from Products p  join fetch SmallCategories s on p.smallCategory=s where s.uid=:categoriesUid")
    List<Optional<Products>> findBySmallCategory(int categoriesUid);

    List<Optional<Products>> findByNameContains(String keyword);

    List<Optional<Products>> findByDeliveryFeeBetween(int start, int end);

    List<Optional<Products>> findByPriceBetween(int start, int end);

    @Query(value = "select p from Products p  join fetch SmallCategories s on p.smallCategory=s where s.uid=:categoriesUid and p.deliveryFee between :start and :end ")
    List<Optional<Products>> findByDeliveryFeeBetweenAndSmallCategory(int categoriesUid, int start, int end);

    @Query(value = "select p from Products p  join fetch SmallCategories s on p.smallCategory=s where s.uid=:categoriesUid and p.price between :start and :end ")
    Optional<List<Products>> findByPriceBetweenAndSmallCategory(int categoriesUid, int start, int end);


//    @Query(" select p from Products p  join fetch SmallCategories s on p.smallCategory=s join fetch BigCategories bc on s.bigCategory=bc join fetch Brands b on p.brand =b")
    @Query(" select distinct(p) from Products p left join Reviews r on r.product = p join fetch Inventories i on i.product=p join fetch SmallCategories s on p.smallCategory=s join fetch BigCategories bc on s.bigCategory=bc join fetch Brands b on p.brand =b")
    List<Products> findAllFetchJoin();
    @Query(" select distinct(p) from Products p left join Reviews r on r.product = p join fetch SmallCategories s on p.smallCategory=s join fetch BigCategories bc on s.bigCategory=bc join fetch Brands b on p.brand =b")
    List<Products> findAllFetchJoinWithReview();


    @Query(value = "select p from Products p join fetch ProductPictures pp on p=pp.product where p.uid=:productsUid")
    Optional<Products> findProductDetailByProductsUid(int productsUid);

//    @EntityGraph(attributePaths ={"productPictures"})


//    @Query("select distinct(p) from Products p " +
//            "join fetch Inventories i on p=i.product " +
//            "join fetch BigCategories bc on p.smallCategory.bigCategory=bc " +
//            "join fetch Brands b on p.brand = b")
//    List<Products> boFiltering();


    @Query("select distinct(p) from Products p " +
            "join fetch Inventories i on p=i.product " +
            "join fetch BigCategories bc on p.smallCategory.bigCategory=bc " +
            "join fetch Brands b on p.brand = b " +
            "where p.name like :name and p.createdDate between :startDate and :endDate and p.smallCategory.uid = coalesce(:smallCategoryUid,p.smallCategory.uid) and p.smallCategory.bigCategory.uid = coalesce(:bigCategoryUid,p.smallCategory.bigCategory.uid) and p.brand.name like :brandName and p.status like :status")
    List<Products> boFiltering(String name, Date startDate, Date endDate, Integer bigCategoryUid, Integer smallCategoryUid, String brandName, String status);


    List<Optional<Products>> findByStatus(String Status);


    @Query(value = "select * " +
            "from products p " +
            "inner join brands b on p.brands_uid = b.uid " +
            "inner join small_categories sc on p.small_categories_uid = sc.uid " +
            "inner join big_categories bc on sc.big_categories_uid = bc.uid " +
            "order by RAND() " +
            "limit 20", nativeQuery = true)
    List<Products> findByRand();



    @Query("select distinct(p) " +
            "from Products p " +
            "left join Reviews r on r.product = p " +
            "join fetch Inventories i on i.product=p " +
            "join fetch SmallCategories s on p.smallCategory=s " +
            "join fetch BigCategories bc on s.bigCategory=bc " +
            "join fetch Brands b on p.brand =b where p.uid IN (:uids)")
    List<Products> findByProductUidIn(List<Integer> uids);
}
