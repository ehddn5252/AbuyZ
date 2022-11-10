package com.tasteshopping.cart.repository;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Carts,Integer> {
    @Override
    @Query("select c from Carts c " +
            "join fetch c.inventory i " +
            "join fetch i.product p " +
            "join fetch p.smallCategory s " +
            "join fetch s.bigCategory")
    List<Carts> findAll();

    List<Carts> findByUser(Users user);

    @Query(value="select c from Carts c where c.uid = (select max(c2.uid) from Carts c2 where c2.user=:user)")
    Carts findByUserAndCurrentUid(Users user);

    Carts findByUserEmailAndUid(String email, int uid);
}
