package com.tasteshopping.user.repository;


import com.tasteshopping.user.entity.UserAddresses;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserAddressRepository extends JpaRepository<UserAddresses,Integer> {
    @Query("select a from UserAddresses a join fetch a.user u where u.email = :#{#email}")
    List<UserAddresses>findByUserEmail(@Param("email")String user_email);

    Integer deleteByUidAndUser(int uid, Users users);
    @Query("select a from UserAddresses a join fetch a.user u where a.uid=:#{#uid} and u.email = :#{#email}")
    Optional<UserAddresses> findByUidAndUser(@Param("uid")Integer uid,@Param("email")String user_email);
}
