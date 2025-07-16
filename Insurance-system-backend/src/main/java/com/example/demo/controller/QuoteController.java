package com.example.demo.controller;

import com.example.demo.Entity.Quote;
import com.example.demo.service.QuoteServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteServiceImpl quoteService;

    // Generate quote for a proposal
    @PostMapping("/generate/{proposalId}")
    public ResponseEntity<Quote> generateQuote(@PathVariable Long proposalId, @RequestBody Quote quote) {
        return ResponseEntity.ok(quoteService.generateQuote(proposalId, quote));
    }

    // Get quote by proposal ID
    @GetMapping("/proposal/{proposalId}")
    public ResponseEntity<Quote> getQuoteByProposalId(@PathVariable Long proposalId) {
        return ResponseEntity.ok(quoteService.getQuoteByProposalId(proposalId));
    }

    // Get all quotes
    @GetMapping("/all")
    public ResponseEntity<List<Quote>> getAllQuotes() {
        return ResponseEntity.ok(quoteService.getAllQuotes());
    }
}
