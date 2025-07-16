package com.example.demo.security;

import com.example.demo.util.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers(
                "/api/auth/**",
                "/api/users/register",
                "/api/officer/register",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/v3/api-docs/**",
                "/api/claims/download/**"
            ).permitAll()

            .requestMatchers("/api/proposals/approve/**", "/api/proposals/reject/**", "/api/proposals/request-info/**").hasRole("OFFICER")
            .requestMatchers("/api/proposals/all").hasRole("OFFICER")

            .requestMatchers("/api/proposals/submit/**").hasRole("USER")
            .requestMatchers("/api/proposals/user/**").hasAnyRole("USER", "OFFICER")

            .requestMatchers("/api/**").hasAnyRole("USER", "OFFICER")

            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
