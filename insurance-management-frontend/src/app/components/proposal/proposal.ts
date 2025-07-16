import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProposalModel } from '../../models/proposal.model';
import { ProposalService } from '../../services/proposal';

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './proposal.html',
  styleUrls: ['./proposal.css'],
})
export class ProposalComponent implements OnInit {

  proposal: ProposalModel = new ProposalModel();
  successMessage: string = '';
  errorMessage: string = '';
  userProposals: ProposalModel[] = [];
  loading = false;
  selectedFile: File | null = null;

  constructor(private proposalService: ProposalService) {}

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (!userId) {
      this.errorMessage = 'User not logged in!';
      return;
    }

    if (!this.selectedFile) {
      this.errorMessage = 'Please select a document to upload.';
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.proposalService.createProposal(this.proposal, userId).subscribe({
      next: (savedProposal) => {
        if (savedProposal && savedProposal.id) {
          this.uploadDocument(savedProposal.id);
        } else {
          this.errorMessage = 'Proposal submitted, but invalid response from server.';
          this.loading = false;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to submit proposal.';
        this.loading = false;
      }
    });
  }

  uploadDocument(proposalId: number): void {
    if (!this.selectedFile) {
      this.loading = false;
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.proposalService.uploadDocument(proposalId, formData).subscribe({
      next: () => {
        this.successMessage = 'Proposal submitted successfully!';
        //this.getUserProposals();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error uploading document:', error);
        this.errorMessage = 'Proposal submitted, but document upload failed.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getUserProposals(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.proposalService.getUserProposals(userId).subscribe({
      next: (data) => {
        this.userProposals = data;
      },
      error: (error) => {
        console.error('Error fetching proposals:', error);
        this.userProposals = [];
      }
    });
  }

  deleteProposal(proposalId: number | undefined): void {
    if (!proposalId) {
      console.error('Proposal ID is undefined.');
      return;
    }

    this.proposalService.deleteProposal(proposalId).subscribe({
      next: () => {
        this.getUserProposals();
      },
      error: (error) => {
        console.error('Error deleting proposal:', error);
      }
    });
  }

  resetForm(): void {
    this.proposal = new ProposalModel();
    this.selectedFile = null;
  }

  onVehicleNumberInput(): void {
    if (this.proposal.vehicleNumber && this.proposal.vehicleNumber.length >= 2) {
      this.proposal.vehicleNumber = this.proposal.vehicleNumber.substring(0, 2).toUpperCase() + this.proposal.vehicleNumber.substring(2);
    }
  }
}
