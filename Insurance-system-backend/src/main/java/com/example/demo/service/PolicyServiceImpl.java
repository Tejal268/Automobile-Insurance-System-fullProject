package com.example.demo.service;

import com.example.demo.Entity.Payment;
import com.example.demo.Entity.Policy;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.PolicyDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PolicyServiceImpl {

    private final PolicyDocumentRepository policyDocumentRepository;
    private final PaymentRepository paymentRepository;

    
     //Generate a new Policy for the given payment.
     
    public Policy generatePolicyDocument(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        Policy policy = new Policy();
        policy.setIssuedDate(LocalDate.now());
        policy.setPayment(payment);

        // Just save the policy without documentUrl
        return policyDocumentRepository.save(policy);
    }

    
     //Retrieve all saved policies.
     
    public List<Policy> getAllPolicies() {
        return policyDocumentRepository.findAll();
    }
    public List<Policy> getPoliciesByUser(Long userId) {
        return policyDocumentRepository.findByPayment_User_Id(userId);
    }
    
    public Policy addPolicyManually(Policy policy) {
        policy.setIssuedDate(LocalDate.now()); // Set issued date
        return policyDocumentRepository.save(policy);
    }

    
    public Policy generatePolicyWithDocument(Long paymentId, MultipartFile document) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        String fileName = saveDocument(document);

        Policy policy = new Policy();
        policy.setIssuedDate(LocalDate.now());
        policy.setPayment(payment);
        policy.setDocumentUrl(fileName);

        return policyDocumentRepository.save(policy);
    }

    private String saveDocument(MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            Files.createDirectories(Paths.get(uploadDir));

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save document: " + e.getMessage());
        }
    }

    

}
