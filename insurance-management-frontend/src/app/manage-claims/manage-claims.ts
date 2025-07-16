import { Component, OnInit } from '@angular/core';
import { ClaimModel } from '../models/claim.model';
import { ClaimService } from '../claim-service';

@Component({
  selector: 'app-manage-claims',
  standalone: false,
  templateUrl: './manage-claims.html',
  styleUrl: './manage-claims.css'
})
export class ManageClaims implements OnInit {

  claims: ClaimModel[] = [];
  errorMessage: string = '';

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadPendingClaims();
  }

  loadPendingClaims(): void {
    this.claimService.getPendingClaims().subscribe({
      next: data => this.claims = data,
      error: err => {
        console.error('Error loading claims:', err);
        this.errorMessage = err.error?.message || 'Failed to load claims.';
      }
    });
  }

  updateClaimStatus(claim: ClaimModel, status: 'APPROVED' | 'REJECTED'): void {
    this.claimService.updateClaimStatus(claim.id, status).subscribe({
      next: () => {
        claim.status = status; // ✅ Directly update claim status in the UI
      },
      error: err => {
        console.error('Error updating claim status:', err);
        this.errorMessage = err.error?.message || 'Failed to update claim status.';
      }
    });
  }
}
