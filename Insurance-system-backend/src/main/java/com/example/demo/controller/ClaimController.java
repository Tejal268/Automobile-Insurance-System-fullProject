package com.example.demo.controller;

import com.example.demo.Entity.Claim;
import com.example.demo.Entity.ClaimStatus;
import com.example.demo.Exceptions.ResourceNotFoundException;
import com.example.demo.service.ClaimServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimServiceImpl claimService;

    // File a claim
    @PostMapping("/file")
    public ResponseEntity<Claim> fileClaim(@RequestParam Long userId,
                                           @RequestParam Long policyId,
                                           @RequestParam String reason,
                                           @RequestPart(required = false) MultipartFile proofDocument) {
        return ResponseEntity.ok(claimService.fileClaim(userId, policyId, reason, proofDocument));
    }

    // Get claims by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Claim>> getClaimsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(claimService.getClaimsByUser(userId));
    }

    // Get claims by status
    @GetMapping("/status")
    public ResponseEntity<List<Claim>> getClaimsByStatus(@RequestParam ClaimStatus status) {
        return ResponseEntity.ok(claimService.getClaimsByStatus(status));
    }

    // Get all pending claims
    @GetMapping("/pending")
    public ResponseEntity<List<Claim>> getPendingClaims() {
        return ResponseEntity.ok(claimService.getClaimsByStatus(ClaimStatus.PENDING));
    }

    // Update claim status
    @PutMapping("/{claimId}/status")
    public ResponseEntity<Claim> updateStatus(@PathVariable Long claimId,
                                              @RequestBody Map<String, String> request) {
        String statusStr = request.get("status");
        ClaimStatus status = ClaimStatus.valueOf(statusStr);
        return ResponseEntity.ok(claimService.updateClaimStatus(claimId, status));
    }

    // Download Proof Document
    @GetMapping("/download/{claimId}")
    public ResponseEntity<Resource> downloadProof(@PathVariable Long claimId) {
        Claim claim = claimService.getClaimById(claimId);

        if (claim.getProofDocumentPath() == null) {
            throw new ResourceNotFoundException("No document uploaded for this claim");
        }

        try {
            Path filePath = Paths.get(claim.getProofDocumentPath());
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new ResourceNotFoundException("Cannot read the file");
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            throw new RuntimeException("Error reading file: " + e.getMessage());
        }
    }
}
