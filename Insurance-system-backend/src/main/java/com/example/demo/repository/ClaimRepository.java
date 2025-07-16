package com.example.demo.repository;

import com.example.demo.Entity.Claim;
import com.example.demo.Entity.ClaimStatus;
import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByUser(User user);

    List<Claim> findByStatus(ClaimStatus status);
}
