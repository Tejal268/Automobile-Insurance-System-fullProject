package com.example.demo.service;

import com.example.demo.Entity.Proposal;
import com.example.demo.Entity.ProposalStatus;
import com.example.demo.Entity.User;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProposalServiceImpl {

    private final ProposalRepository proposalRepository;
    private final UserRepository userRepository;

    // Create new proposal
    public Proposal submitProposal(Long userId, Proposal proposal) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        proposal.setUser(user);
        proposal.setStatus(ProposalStatus.SUBMITTED);

        Proposal saved = proposalRepository.save(proposal);
        saved.setUser(null); 
        saved.setUserId(userId);
        return saved;
    }

    // Get proposals by user ID
    public List<Proposal> getProposalsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Proposal> proposals = proposalRepository.findByUser(user);
        proposals.forEach(p -> {
            p.setUser(null);
            p.setUserId(userId);
        });
        return proposals;
    }

    // Get all proposals
    public List<Proposal> getAllProposals() {
        List<Proposal> proposals = proposalRepository.findAll();
        proposals.forEach(p -> {
            p.setUserId(p.getUser().getId());
            p.setUser(null);
        });
        return proposals;
    }

    // Delete proposal
    public void deleteProposal(Long proposalId) {
        proposalRepository.deleteById(proposalId);
    }

    // Update status
    public void updateProposalStatus(Long proposalId, ProposalStatus newStatus) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found"));

        proposal.setStatus(newStatus);
        proposalRepository.save(proposal);
    }

    // Approve proposal
    public void approveProposal(Long proposalId) {
        updateProposalStatus(proposalId, ProposalStatus.APPROVED);
    }

    // Reject proposal
    public void rejectProposal(Long proposalId) {
        updateProposalStatus(proposalId, ProposalStatus.REJECTED);
    }

    // Find proposals by Enum Status
    public List<Proposal> getProposalsByStatus(ProposalStatus status) {
        List<Proposal> proposals = proposalRepository.findByStatus(status);
        proposals.forEach(p -> {
            p.setUserId(p.getUser().getId());
            p.setUser(null);
        });
        return proposals;
    }

    // Save uploaded document
    public void saveDocument(Long proposalId, MultipartFile file) throws java.io.IOException {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found"));

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new RuntimeException("Only PDF documents are allowed");
        }

        proposal.setDocumentName(file.getOriginalFilename());
        proposal.setDocumentType(file.getContentType());
        proposal.setDocumentData(file.getBytes());

        proposalRepository.save(proposal);
    }
}
