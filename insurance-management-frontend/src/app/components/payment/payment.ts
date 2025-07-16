import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent implements OnInit {

  proposalId: number = 0;
  quote: any = null;
  paymentMode: string = 'UPI';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ✅ Read proposalId from route query params if passed
    this.route.queryParams.subscribe(params => {
      const proposalIdParam = params['proposalId'];
      if (proposalIdParam) {
        this.proposalId = parseInt(proposalIdParam, 10);
        this.getQuote(); // Fetch quote directly
      }
    });

    // ✅ OR fallback to local storage (optional)
    if (!this.proposalId) {
      const storedProposalId = localStorage.getItem('proposalId');
      if (storedProposalId) {
        this.proposalId = parseInt(storedProposalId, 10);
        this.getQuote();
      }
    }
  }

  getQuote(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.paymentService.getQuote(this.proposalId).subscribe({
      next: (data) => {
        this.quote = data;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Quote not found for this proposal.';
      }
    });
  }

  makePayment(): void {
    if (!this.quote) return;

    const userIdStr = localStorage.getItem('userId'); 
    if (!userIdStr) {
      this.errorMessage = 'User not logged in.';
      return;
    }

    const userId = Number(userIdStr); 
    const quoteId = this.quote.id;
    const amount = this.quote.amount;
    const paymentMode = this.paymentMode;
    const paymentDate = new Date().toISOString().split('T')[0]; 

    this.paymentService.makePayment(userId, quoteId, amount, paymentMode, paymentDate).subscribe({
      next: () => {
        this.successMessage = 'Payment completed successfully!';
        this.errorMessage = '';
        this.quote = null;
        this.proposalId = 0;
      },
      error: (error) => {
        console.error(error);
        if (error.error?.message?.includes('already exists')) {
          this.errorMessage = 'Payment already completed for this quote.';
        } else {
          this.errorMessage = 'Payment failed.';
        }
        this.successMessage = '';
      }
    });
  }
}
