package com.tasteshopping.user.service;

import com.tasteshopping.user.entity.Users;
import com.tasteshopping.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Component("userDetailsService")
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String email) {
        Optional<Users> findUser =  userRepository.findByEmail(email);
        if(!findUser.isPresent()||findUser.get().getStatus()==1) throw new UsernameNotFoundException(email + " -> 데이터베이스에서 찾을 수 없습니다.");
        return createUser(findUser.get());
    }

    private org.springframework.security.core.userdetails.User createUser(Users user) {

        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getUserRoles().toString());

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                Collections.singleton(grantedAuthority));
    }
}
