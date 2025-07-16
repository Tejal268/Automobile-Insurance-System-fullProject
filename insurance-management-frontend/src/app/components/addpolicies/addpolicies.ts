import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../services/policy';

@Component({
  selector: 'app-addpolicies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addpolicies.html',
  styleUrl: './addpolicies.css'
})
export class Addpolicies {
  policyForm: FormGroup;
  message = '';
  success = false;

  constructor(private policyService: PolicyService) {
    this.policyForm = new FormGroup({
      paymentId: new FormControl('', [Validators.required])
    });
  }
selectedFile: File | null = null;

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

submitPolicy(): void {
  if (this.policyForm.invalid || !this.selectedFile) {
    this.message = 'Please fill all fields and upload the document.';
    this.success = false;
    return;
  }

  const formData = new FormData();
  formData.append('paymentId', this.policyForm.value.paymentId);
  formData.append('document', this.selectedFile!);

  this.policyService.generatePolicyWithDocument(formData).subscribe({
    next: (res) => {
      this.message = 'Policy generated and document uploaded successfully!';
      this.success = true;
      this.policyForm.reset();
      this.selectedFile = null;
    },
    error: (err) => {
      this.message = 'Failed to generate policy or upload document.';
      this.success = false;
    }
  });
}

}
