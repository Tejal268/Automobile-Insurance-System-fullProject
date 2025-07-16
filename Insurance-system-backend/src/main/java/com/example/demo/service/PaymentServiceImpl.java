package com.example.demo.service;

import com.example.demo.Entity.*;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.QuoteRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final QuoteRepository quoteRepository;
    private final ProposalRepository proposalRepository;

    
   // create a payment for a quote.
    
    public Payment makePayment(Long userId, Long quoteId, Double amount, String paymentMode, LocalDate paymentDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new RuntimeException("Quote not found with ID: " + quoteId));

        // Check if a payment already exists for this quote
        if (paymentRepository.findByQuoteId(quoteId).isPresent()) {
            throw new RuntimeException("Payment already exists for this quote!");
        }

        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setPaymentMode(paymentMode);
        payment.setPaymentDate(paymentDate);
        payment.setUser(user);
        payment.setQuote(quote);

        return paymentRepository.save(payment);
    }


    
     // Get payment details by ID.
     
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with ID: " + id));
    }

    
     //List all payments.
     
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    
     //Complete a payment automatically when a proposal is approved.
     
    @Transactional
    public void completeProposalPayment(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found with ID: " + proposalId));

        // Check if already paid
        if (proposal.getStatus() == ProposalStatus.PAID) {
            throw new RuntimeException("Proposal is already paid!");
        }

        // ✅ Allow payment only if the proposal is approved
        if (proposal.getStatus() != ProposalStatus.APPROVED) {
            throw new RuntimeException("Proposal must be APPROVED before making payment!");
        }

        // ✅ Create a quote (replace with real calculation later)
        Quote quote = new Quote();
        quote.setAmount(5000.0); // Example static amount
        quote = quoteRepository.save(quote);

        // Create and save the payment
        Payment payment = new Payment();
        payment.setAmount(quote.getAmount());
        payment.setPaymentMode("CARD");
        payment.setPaymentDate(LocalDate.now());
        payment.setUser(proposal.getUser());
        payment.setQuote(quote);
        paymentRepository.save(payment);

        //  Update the proposal status to PAID
        proposal.setStatus(ProposalStatus.PAID);
        proposalRepository.save(proposal);
    }
}
