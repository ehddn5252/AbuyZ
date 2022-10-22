package com.tasteshopping.product.repository;

import com.tasteshopping.product.dto.ProductDetailDto;
import com.tasteshopping.product.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Products,Integer> {
    @Query(value="select max(uid) from Products")
    public Optional<Integer> getMaxUid();

    @Query(value = "select p from Products p  join fetch SmallCategories s on p.smallCategory=s join fetch BigCategories b on s.bigCategory=b where b.uid=:categoriesUid")
    public List<Optional<Products>> findByBigCategory(int categoriesUid);

    @Query(value = "select p from Products p  join fetch SmallCategories s on p.smallCategory=s where s.uid=:categoriesUid")
    public List<Optional<Products>> findBySmallCategory(int categoriesUid);
    public List<Optional<Products>> findByNameContains(String keyword);

    List<Optional<Products>> findByDeliveryFeeBetween(int start, int end);

    List<Optional<Products>> findByPriceBetween(int start, int end);

    @Query(value = "select p from Products p  join fetch SmallCategories s on p.smallCategory=s where s.uid=:categoriesUid and p.deliveryFee between :start and :end ")
    List<Optional<Products>> findByDeliveryFeeBetweenAndSmallCategory(int categoriesUid, int start, int end);

    @Query(value = "select p from Products p  join fetch SmallCategories s on p.smallCategory=s where s.uid=:categoriesUid and p.price between :start and :end ")
    List<Optional<Products>> findByPriceBetweenAndSmallCategory(int categoriesUid, int start, int end);

//    @Query(value = "select p,pp from Products p left join fetch ProductPictures pp on p=pp.product where p.uid=:productsUid")
//    List<Optional<Products>> findProductDetailByProductsUid(int productsUid);

//    @Query(value = "select p,pp from Products p left join fetch ProductPictures pp on p=pp.product where p.uid=:productsUid")
//    Object findProductDetailByProductsUid(int productsUid);

    @Query(value = "select p from Products p join fetch ProductPictures pp on p=pp.product where p.uid=:productsUid")
    Optional<Products> findProductDetailByProductsUid(int productsUid);
}
