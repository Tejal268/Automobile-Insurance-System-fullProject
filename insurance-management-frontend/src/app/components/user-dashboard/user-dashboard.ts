import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../shared-layout/navbar/navbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],

  standalone: true, // ✅ Required for imports to work
  imports: [CommonModule, RouterModule], // ✅ Removed HttpClientModule from here
})
export class UserDashboard {

  constructor(private http: HttpClient) {}

  downloadPolicy(): void {
    this.http.get('http://localhost:9999/api/policy/download', { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'PolicyDocument.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('❌ Failed to download policy:', err);
        alert('Failed to download the policy document.');
      }
    });
  }

  totalProposals = 24;
  totalPolicies = 17;
  totalClaims = 9;



}
