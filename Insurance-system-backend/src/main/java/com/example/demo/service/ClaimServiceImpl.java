package com.example.demo.service;

import com.example.demo.Entity.*;
import com.example.demo.Exceptions.ResourceNotFoundException;
import com.example.demo.Exceptions.UserNotFound;
import com.example.demo.repository.ClaimRepository;
import com.example.demo.repository.PolicyDocumentRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClaimServiceImpl {

    private final ClaimRepository claimRepository;
    private final UserRepository userRepository;
    private final PolicyDocumentRepository policyRepository;

    public Claim fileClaim(Long userId, Long policyId, String reason, MultipartFile proofDocument) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFound("User not found"));

        Policy policy = policyRepository.findById(policyId).orElseThrow(() -> new ResourceNotFoundException("Policy not found"));

        String filePath = null;

        if (proofDocument != null && !proofDocument.isEmpty()) {
            String uploadDir = System.getProperty("user.dir") + "/uploads/claims/";
            File dir = new File(uploadDir);
            if (!dir.exists() && !dir.mkdirs()) {
                throw new RuntimeException("Failed to create upload directory: " + uploadDir);
            }

            String fileName = System.currentTimeMillis() + "_" + proofDocument.getOriginalFilename();
            filePath = uploadDir + fileName;

            try {
                proofDocument.transferTo(new File(filePath));
            } catch (IOException e) {
                throw new RuntimeException("Failed to save file: " + e.getMessage());
            }
        }

        Claim claim = new Claim();
        claim.setClaimDate(LocalDate.now());
        claim.setReason(reason);
        claim.setStatus(ClaimStatus.PENDING);
        claim.setUser(user);
        claim.setPolicy(policy);
        claim.setProofDocumentPath(filePath);

        return claimRepository.save(claim);
    }

    public List<Claim> getClaimsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFound("User not found"));
        return claimRepository.findByUser(user);
    }

    public Claim updateClaimStatus(Long claimId, ClaimStatus status) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found"));
        claim.setStatus(status);
        return claimRepository.save(claim);
    }

    public List<Claim> getClaimsByStatus(ClaimStatus status) {
        return claimRepository.findByStatus(status);
    }

    public Claim getClaimById(Long claimId) {
        return claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found"));
    }
}
