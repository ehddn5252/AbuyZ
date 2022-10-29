package com.tasteshopping.config;

import com.tasteshopping.user.repository.UserRepository;
import com.tasteshopping.user.security.JwtAccessDeniedHandler;
import com.tasteshopping.user.security.JwtAuthenticationEntryPoint;
import com.tasteshopping.user.security.JwtFilter;
import com.tasteshopping.user.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true) // @PreAuthorize 어노테이션을 메서드 단위로 추가하기위해 적용
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        JwtFilter customFilter = new JwtFilter(tokenProvider,userRepository);
        httpSecurity
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                .csrf().disable()

                // exception을 핸들링할때 만들었던 에러처리 클래스들을 추가해준다.
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
        // 인증없이 접근을 허용하는 path 추가
//                .and()
//                .authorizeRequests()
//                // 나머지 요청은 모두 인증을 받는다
//                .anyRequest().authenticated()

        // JwtFilter를 addFilterBefore로 등록했던 JwtSecurityConfig 클래스도 적용
//                .and()
//                .apply(new JwtSecurityConfig(tokenProvider));
    }
}