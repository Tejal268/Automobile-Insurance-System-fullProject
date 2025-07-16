package com.example.demo.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

	private final String SECRET_KEY = "k2HjB8zNFd0WpV3LtRmT5cPvX8oEwT9q"; 



    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject(); 
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                   .setSigningKey(SECRET_KEY.getBytes())
                   .parseClaimsJws(token)
                   .getBody();
    }
}
