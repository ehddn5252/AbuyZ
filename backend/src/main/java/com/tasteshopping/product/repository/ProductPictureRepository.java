package com.tasteshopping.product.repository;

import com.tasteshopping.product.entity.ProductPictures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductPictureRepository extends JpaRepository<ProductPictures,Integer> {
}
