package com.tasteshopping.cart.repository;

import com.tasteshopping.cart.entity.Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Carts,Integer> {
    @Override
    @Query("select c from Carts c " +
            "join fetch c.product p " +
            "join fetch p.smallCategory s " +
            "join fetch s.bigCategory")
    List<Carts> findAll();

    @Query(value=" select c from Carts c join fetch Users u on c.user = u where u.uid = :usersUid")
    List<Carts> findByUsersUid(int usersUid);
}
