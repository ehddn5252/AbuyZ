package com.tasteshopping.user.repository;


import com.tasteshopping.user.entity.UserAddresses;
import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserAddressRepository extends JpaRepository<UserAddresses,Integer> {
    @EntityGraph(attributePaths = {"user"})
    List<UserAddresses>findByUserEmail(String email);

    Integer deleteByUidAndUser(int uid, Users users);
    @EntityGraph(attributePaths = {"user"})
    Optional<UserAddresses> findByUidAndUserEmail(Integer uid,String email);
}
