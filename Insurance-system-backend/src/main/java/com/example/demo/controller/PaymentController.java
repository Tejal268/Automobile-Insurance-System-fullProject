package com.example.demo.controller;

import com.example.demo.Entity.Payment;
import com.example.demo.service.PaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService;

   
    @PostMapping("/make-payment")
    public ResponseEntity<Payment> makePayment(@RequestParam Long userId,
                                               @RequestParam Long quoteId,
                                               @RequestParam Double amount,
                                               @RequestParam String paymentMode,
                                               @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate paymentDate) {
        Payment payment = paymentService.makePayment(userId, quoteId, amount, paymentMode, paymentDate);
        return ResponseEntity.ok(payment);
    }

    
     //Get payment by ID.
    
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    // Get all payments.
     
    @GetMapping("/all")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    
    // Complete payment for an approved proposal.
   
    @PostMapping("/complete/{proposalId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String, String>> completeProposalPayment(@PathVariable Long proposalId) {
        paymentService.completeProposalPayment(proposalId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Payment completed and proposal status updated to PAID.");
        return ResponseEntity.ok(response);
    }
}
