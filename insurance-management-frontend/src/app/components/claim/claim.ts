import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClaimService } from '../../claim-service';
import { PolicyService } from '../../services/policy';
import { Auth } from '../../services/auth';

import { ClaimModel } from '../../models/claim.model';
import { PolicyModel } from '../../models/policy.model';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './claim.html',
  styleUrls: ['./claim.css']
})
export class Claim implements OnInit {

  claimForm!: FormGroup;
  userClaims: ClaimModel[] = [];
  userPolicies: PolicyModel[] = [];
  errorMessage: string = '';
  proofFile: File | null = null;

  constructor(
    private claimService: ClaimService,
    private policyService: PolicyService,
    private auth: Auth,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserPolicies();
    this.loadUserClaims();
  }

  initForm(): void {
    this.claimForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.proofFile = event.target.files[0] || null;
  }

  fileClaim(): void {
    if (this.claimForm.invalid || !this.proofFile) {
      this.errorMessage = 'Please provide a reason and select a proof document.';
      return;
    }

    const { reason } = this.claimForm.value;
    const userId = Number(this.auth.getUserId());

    if (!userId || isNaN(userId)) {
      this.errorMessage = 'Invalid user session.';
      return;
    }

    const selectedPolicy = this.userPolicies[0];  // ✅ Select first active policy (optional: make selectable)
    if (!selectedPolicy) {
      this.errorMessage = 'No active policy found for this user.';
      return;
    }

    const policyId = selectedPolicy.id;

    this.claimService.fileClaim(userId, policyId, reason, this.proofFile).subscribe({
      next: () => {
        this.errorMessage = '';
        this.claimForm.reset();
        this.proofFile = null;
        this.loadUserClaims();
      },
      error: err => {
        console.error('Error filing claim:', err);
        this.errorMessage = err.error?.message || 'Failed to file claim.';
      }
    });
  }

  loadUserPolicies(): void {
    const userId = Number(this.auth.getUserId());
    if (!userId || isNaN(userId)) {
      console.error('Invalid user ID, cannot load policies.');
      return;
    }

    this.policyService.getPolicies2(userId).subscribe({
      next: data => this.userPolicies = data,
      error: err => {
        console.error('Error loading policies:', err);
        this.userPolicies = [];
      }
    });
  }

  loadUserClaims(): void {
    const userId = Number(this.auth.getUserId());
    if (!userId || isNaN(userId)) {
      console.error('Invalid user ID, cannot load claims.');
      return;
    }

    this.claimService.getUserClaims(userId).subscribe({
      next: data => this.userClaims = data,
      error: err => {
        console.error('Error loading claims:', err);
        this.userClaims = [];
      }
    });
  }
}
