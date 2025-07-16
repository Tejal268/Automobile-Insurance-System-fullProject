package com.example.demo.controller;

import com.example.demo.Entity.Payment;
import com.example.demo.Entity.Policy;
import com.example.demo.repository.PolicyDocumentRepository;

import com.example.demo.util.JwtService;
import com.example.demo.Entity.PdfGenerator;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
public class PolicyPdfController {

    private final PolicyDocumentRepository policyDocumentRepository;
  
    private final JwtService jwtService;

    @GetMapping("/download-pdf/{policyId}")
    public ResponseEntity<byte[]> downloadPolicyPdf(@PathVariable Long policyId) throws IOException {
        Policy doc = policyDocumentRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        Payment payment = doc.getPayment();
        String username = payment.getUser().getName();
        String vehicleInfo = payment.getQuote().getProposal().getVehicleNumber();
        String policyNumber = "DOC" + doc.getId();
        String date = doc.getIssuedDate().toString();

        ByteArrayInputStream pdfStream = PdfGenerator.generatePolicyPdf(policyNumber, username, vehicleInfo, date);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=policy_" + doc.getId() + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfStream.readAllBytes());
    }

   



}
