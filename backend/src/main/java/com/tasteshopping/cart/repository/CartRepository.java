package com.tasteshopping.cart.repository;

import com.tasteshopping.cart.entity.Carts;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Carts,Integer> {
    @EntityGraph(attributePaths = {"inventory","inventory.product",
            "inventory.product.smallCategory","inventory.product.smallCategory.bigCategory"})
    List<Carts> findAll();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<Carts> findByUser(Users user);

    @Query("select c from Carts c join fetch c.inventory i join fetch  i.product where c.user=:user")
    List<Carts> findByUserFetchJoin(Users user);

    @Query(value="select c from Carts c where c.uid = (select max(c2.uid) from Carts c2 where c2.user=:user)")
    Carts findByUserAndCurrentUid(Users user);

    Carts findByUserEmailAndUid(String email, int uid);
}
