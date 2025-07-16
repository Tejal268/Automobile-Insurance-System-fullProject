import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../services/policy';
import { PolicyModel } from '../models/policy.model';

@Component({
  selector: 'app-officer-policy-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './officer-policy-list.html',
  styleUrls: ['./officer-policy-list.css']
})
export class OfficerPolicyList implements OnInit {

  policies: PolicyModel[] = [];
  errorMessage: string = '';

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.fetchAllPolicies();
  }

  fetchAllPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (data: PolicyModel[]) => {
        this.policies = data;
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error fetching policies:', error);
        this.errorMessage = 'Failed to fetch policies.';
        this.policies = [];
      }
    });
  }

  extractPolicyNumber(url: string): string {
    if (!url) return '-';
    const parts = url.split('/');
    return parts[parts.length - 1] || '-';
  }

  downloadPdf(policyId: number): void {
    this.policyService.downloadPolicyPdf(policyId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Policy_${policyId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Error downloading PDF:', error);
        this.errorMessage = 'Failed to download policy document.';
      }
    });
  }
}
