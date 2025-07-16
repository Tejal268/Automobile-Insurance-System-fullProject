package com.example.demo.controller;

import com.example.demo.Entity.Proposal;
import com.example.demo.Entity.ProposalStatus;
import com.example.demo.service.ProposalServiceImpl;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/proposals")
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalServiceImpl proposalService;

    @PostMapping("/submit/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Proposal> submitProposal(
            @PathVariable Long userId,
            @RequestBody Proposal proposal
    ) {
        Proposal savedProposal = proposalService.submitProposal(userId, proposal);
        return ResponseEntity.ok(savedProposal);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'OFFICER')")
    public ResponseEntity<List<Proposal>> getUserProposals(@PathVariable Long userId) {
        return ResponseEntity.ok(proposalService.getProposalsByUserId(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Proposal>> getAllProposals() {
        return ResponseEntity.ok(proposalService.getAllProposals());
    }
    
    @DeleteMapping("/{proposalId}")
    public ResponseEntity<String> deleteProposal(@PathVariable Long proposalId) {
        proposalService.deleteProposal(proposalId);
        return ResponseEntity.ok("Proposal deleted successfully");
    }
    
 // Approve a proposal
    @PostMapping("/approve/{proposalId}")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<String> approveProposal(@PathVariable Long proposalId) {
        proposalService.approveProposal(proposalId);
        return ResponseEntity.ok("Proposal approved");
    }

    // Reject a proposal
    @PostMapping("/reject/{proposalId}")
    @PreAuthorize("hasRole('OFFICER')")
    public ResponseEntity<String> rejectProposal(@PathVariable Long proposalId) {
        proposalService.rejectProposal(proposalId);
        return ResponseEntity.ok("Proposal rejected");
    }

    @GetMapping("/status/{status}")
    public List<Proposal> getProposalsByStatus(@PathVariable String status) {
        ProposalStatus proposalStatus;
        try {
            proposalStatus = ProposalStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status: " + status);
        }

        return proposalService.getProposalsByStatus(proposalStatus);
    }




    @PostMapping("/{proposalId}/uploadDocument")
    public ResponseEntity<String> uploadDocument(
            @PathVariable Long proposalId,
            @RequestParam("file") MultipartFile file) throws IOException {

        proposalService.saveDocument(proposalId, file);
        return ResponseEntity.ok("Document uploaded successfully!");
    }

}

