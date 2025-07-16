package com.example.demo;

import com.example.demo.Entity.*;
import com.example.demo.Exceptions.QuoteNotFoundException;
import com.example.demo.Exceptions.ResourceNotFoundException;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.QuoteRepository;
import com.example.demo.service.QuoteServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class QuoteServiceImplTest {

    @Mock
    private QuoteRepository quoteRepository;

    @Mock
    private ProposalRepository proposalRepository;

    @InjectMocks
    private QuoteServiceImpl quoteService;

    private Proposal proposal;
    private Quote quote;

    @BeforeEach
    void setup() {
        proposal = new Proposal();
        proposal.setId(1L);
        proposal.setStatus(ProposalStatus.SUBMITTED);

        quote = new Quote();
        quote.setId(10L);
        quote.setAmount(5000.0);
        quote.setProposal(proposal);
    }

  

    @Test
    void testGenerateQuote_ProposalNotFound() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.empty());

        Exception ex = assertThrows(ResourceNotFoundException.class, () ->
                quoteService.generateQuote(1L, quote)
        );

        assertEquals("Proposal not found with ID: 1", ex.getMessage());
    }

    @Test
    void testGenerateQuote_QuoteAlreadyExists() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.of(proposal));
        when(quoteRepository.findByProposal(proposal)).thenReturn(Optional.of(new Quote()));

        Exception ex = assertThrows(IllegalArgumentException.class, () ->
                quoteService.generateQuote(1L, quote)
        );

        assertEquals("Quote already exists for this proposal.", ex.getMessage());
    }

  

    @Test
    void testGetQuoteByProposalId_ProposalNotFound() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.empty());

        Exception ex = assertThrows(ResourceNotFoundException.class, () ->
                quoteService.getQuoteByProposalId(1L)
        );

        assertEquals("Proposal not found with ID: 1", ex.getMessage());
    }

    @Test
    void testGetQuoteByProposalId_QuoteNotFound() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.of(proposal));
        when(quoteRepository.findByProposal(proposal)).thenReturn(Optional.empty());

        Exception ex = assertThrows(QuoteNotFoundException.class, () ->
                quoteService.getQuoteByProposalId(1L)
        );

        assertEquals("Quote not found for proposal ID: 1", ex.getMessage());
    }


}
