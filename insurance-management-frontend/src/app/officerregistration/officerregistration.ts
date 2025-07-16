import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-officer-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './officerregistration.html'
})
export class OfficerRegistration {

  officerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.officerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      designation: ['Underwriter'] // default designation
    });
  }

  registerOfficer(): void {
    if (this.officerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    const formData = this.officerForm.value;

    this.auth.registerOfficer(formData).subscribe({
      next: () => {
        this.successMessage = 'Officer registered successfully!';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Officer registration error:', err);
        this.errorMessage = err.error?.message || 'Officer registration failed. Please try again.';
        this.successMessage = '';
      }
    });
  }

  
  
}
