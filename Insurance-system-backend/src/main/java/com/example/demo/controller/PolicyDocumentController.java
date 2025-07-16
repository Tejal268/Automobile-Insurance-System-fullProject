package com.example.demo.controller;

import com.example.demo.Entity.Policy;
import com.example.demo.service.PolicyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
public class PolicyDocumentController {

    private final PolicyServiceImpl policyDocumentService;

    @PostMapping("/generate/{paymentId}")
    public ResponseEntity<Policy> generatePolicyDoc(@PathVariable Long paymentId) {
        Policy document = policyDocumentService.generatePolicyDocument(paymentId);
        return ResponseEntity.ok(document);
    }
    @PostMapping("/add")
    public ResponseEntity<Policy> addPolicy(@RequestBody Policy policy) {
        Policy savedPolicy = policyDocumentService.addPolicyManually(policy);
        return ResponseEntity.ok(savedPolicy);
    }

    @GetMapping
    public ResponseEntity<List<Policy>> getAllPolicies() {
        List<Policy> policies = policyDocumentService.getAllPolicies();
        return ResponseEntity.ok(policies);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Policy>> getPoliciesByUser(@PathVariable Long userId) {
        List<Policy> policies = policyDocumentService.getPoliciesByUser(userId);
        return ResponseEntity.ok(policies);
    }
    
    @PostMapping("/generate-with-doc")
    public ResponseEntity<Policy> generatePolicyWithDocument(
            @RequestParam Long paymentId,
            @RequestParam("document") MultipartFile document) {

        Policy policy = policyDocumentService.generatePolicyWithDocument(paymentId, document);
        return ResponseEntity.ok(policy);
    }

}
