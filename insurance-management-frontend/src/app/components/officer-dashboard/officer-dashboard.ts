import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProposalModel } from '../../models/proposal.model';
import { OfficerService } from '../../officer-service';

@Component({
  selector: 'app-officer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './officer-dashboard.html',
  styleUrls: ['./officer-dashboard.css']
})
export class OfficerDashboard implements OnInit {

  proposals: ProposalModel[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(private officerService: OfficerService) {}

  ngOnInit(): void {
    this.getAllProposals();
  }

  getAllProposals(): void {
    this.officerService.getAllProposals().subscribe({
      next: (data) => {
        this.proposals = data;
        this.errorMessage = '';
        this.successMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to fetch proposals.';
        this.proposals = [];
      }
    });
  }

  getProposalsByStatus(status: string): void {
    this.officerService.getProposalsByStatus(status).subscribe({
      next: (data) => {
        this.proposals = data;
        this.successMessage = `Showing proposals with status: ${status}`;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to fetch proposals by status.';
        this.proposals = [];
      }
    });
  }

  approve(proposalId: number): void {
    this.officerService.approveProposal(proposalId).subscribe({
      next: () => {
        this.successMessage = 'Proposal approved successfully.';
        this.errorMessage = '';
        this.getAllProposals();
      },
      error: () => {
        this.errorMessage = 'Failed to approve proposal.';
      }
    });
  }

  reject(proposalId: number): void {
    this.officerService.rejectProposal(proposalId).subscribe({
      next: () => {
        this.successMessage = 'Proposal rejected successfully.';
        this.errorMessage = '';
        this.getAllProposals();
      },
      error: () => {
        this.errorMessage = 'Failed to reject proposal.';
      }
    });
  }

  generateQuote(proposalId: number): void {
    const amount = prompt('Enter Quote Amount:');
    const expiryDate = prompt('Enter Expiry Date (YYYY-MM-DD):');
    if (!amount || !expiryDate) {
      alert('Amount and expiry date are required.');
      return;
    }

    this.officerService.generateQuote(proposalId, {
      amount: parseFloat(amount),
      expiryDate
    }).subscribe({
      next: () => {
        this.successMessage = 'Quote generated successfully.';
        this.errorMessage = '';
        this.getAllProposals();
      },
      error: (error) => {
        if (error.status === 400 && error.error.message?.includes('Quote already exists')) {
          this.errorMessage = 'A quote has already been generated for this proposal.';
        } else {
          this.errorMessage = 'Failed to generate quote.';
        }
      }
    });
  }

  generatePolicy(paymentId: number): void {
    this.officerService.generatePolicy(paymentId).subscribe({
      next: () => {
        this.successMessage = 'Policy generated successfully.';
        this.errorMessage = '';
        this.getAllProposals();
      },
      error: () => {
        this.errorMessage = 'Failed to generate policy.';
      }
    });
  }

  isQuoteGenerated(proposalId: number): boolean {
    const proposal = this.proposals.find(p => p.id === proposalId);
    return proposal?.status === 'QUOTE_GENERATED';
  }
}
