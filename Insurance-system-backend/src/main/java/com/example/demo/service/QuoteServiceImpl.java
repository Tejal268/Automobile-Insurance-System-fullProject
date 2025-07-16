package com.example.demo.service;

import com.example.demo.Entity.Proposal;
import com.example.demo.Entity.ProposalStatus;
import com.example.demo.Entity.Quote;
import com.example.demo.Exceptions.QuoteNotFoundException;
import com.example.demo.Exceptions.ResourceNotFoundException;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteServiceImpl {

    private final QuoteRepository quoteRepository;
    private final ProposalRepository proposalRepository;

    public Quote generateQuote(Long proposalId, Quote quote) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found with ID: " + proposalId));

       
        if (quoteRepository.findByProposal(proposal).isPresent()) {
            throw new IllegalArgumentException("Quote already exists for this proposal.");
        }

        quote.setProposal(proposal);

        // ✅ Optionally, update proposal status to "QUOTE_GENERATED"
        proposal.setStatus(ProposalStatus.QUOTE_GENERATED);
        proposalRepository.save(proposal);

        return quoteRepository.save(quote);
    }


    public Quote getQuoteByProposalId(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found with ID: " + proposalId));

        return quoteRepository.findByProposal(proposal)
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found for proposal ID: " + proposalId));
    }

    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }
}
