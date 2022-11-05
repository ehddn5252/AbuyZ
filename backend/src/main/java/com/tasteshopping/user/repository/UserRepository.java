package com.tasteshopping.user.repository;

import com.tasteshopping.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Integer> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByNickname(String nickname);
}
