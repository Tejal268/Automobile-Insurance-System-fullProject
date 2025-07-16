import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy.html',
  styleUrl: './policy.css'
})
export class Policy implements OnInit {

  policies: any[] = [];
  errorMessage: string = '';

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.getPolicies();
  }

  /**
   * ✅ Fetch all policies and filter only for the logged-in user.
   */
getPolicies(): void {
  const userId = Number(localStorage.getItem('userId'));
  
  if (!userId || isNaN(userId)) {
    this.errorMessage = 'User ID not found or invalid.';
    this.policies = [];
    return;
  }

  this.policyService.getPolicies2(userId).subscribe({
    next: (data) => {
      console.log('Policies received:', data);
      this.policies = data; // no need to filter if backend already returns user-specific policies
    },
    error: (error) => {
      console.error('Error fetching policies:', error);
      this.errorMessage = 'Failed to load policies.';
      this.policies = [];
    }
  });
}



  /**
   * ✅ Download policy document as a PDF.
   */
  downloadPolicy(policyId: number): void {
    this.policyService.downloadPolicyPdf(policyId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `policy_${policyId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading policy:', error);
        alert('Error downloading policy PDF.');
      }
    });
  }
}
