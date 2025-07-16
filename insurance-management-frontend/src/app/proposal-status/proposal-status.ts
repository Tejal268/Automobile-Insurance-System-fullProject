import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProposalModel } from '../models/proposal.model';
import { ProposalService } from '../services/proposal';
import { PaymentService } from '../services/payment';

@Component({
  selector: 'app-proposal-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './proposal-status.html',
  styleUrls: ['./proposal-status.css'],
})
export class ProposalStatus implements OnInit {

  userProposals: ProposalModel[] = [];
  errorMessage: string = '';
  quote: any = null;
  selectedProposalId: number = 0;

  constructor(
    private proposalService: ProposalService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProposals();
  }

  /**
   * Fetch all proposals for the logged-in user.
   */
  getUserProposals(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.proposalService.getUserProposals(userId).subscribe({
      next: (data) => {
        this.userProposals = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching proposals:', error);
        this.errorMessage = 'Failed to fetch proposals.';
      }
    });
  }

  /**
   * View quote for selected proposal.
   */
  viewQuote(proposalId: number): void {
    this.selectedProposalId = proposalId;
    this.paymentService.getQuote(proposalId).subscribe({
      next: (data) => {
        this.quote = data;
      },
      error: (error) => {
        console.error('Error fetching quote:', error);
        alert('Failed to fetch quote. Please try again.');
      }
    });
  }

  /**
   * Proceed to payment page and store proposal & quote in local storage.
   */
  proceedToPayment(): void {
    if (this.quote && this.selectedProposalId) {
      localStorage.setItem('proposalId', this.selectedProposalId.toString());
      localStorage.setItem('quote', JSON.stringify(this.quote));
      this.router.navigate(['/payment']);
    }
  }

  /**
   * Delete a submitted/pending proposal.
   */
  deleteProposal(proposalId: number | undefined): void {
    if (!proposalId) {
      console.error('Proposal ID is undefined.');
      return;
    }

    this.proposalService.deleteProposal(proposalId).subscribe({
      next: () => this.getUserProposals(),
      error: (error) => {
        console.error('Error deleting proposal:', error);
        alert('Failed to delete proposal.');
      }
    });
  }
}
