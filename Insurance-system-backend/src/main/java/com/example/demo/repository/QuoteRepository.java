package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Proposal;
import com.example.demo.Entity.Quote;

public interface QuoteRepository extends JpaRepository<Quote, Long>{

	  Optional<Quote> findByProposal(Proposal proposal);
}
