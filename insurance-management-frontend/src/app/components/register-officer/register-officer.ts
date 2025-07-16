import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Navbar } from '../shared-layout/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-officer.html',
  styleUrls: ['./register-officer.css']
})
export class RegisterOfficer {

  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', Validators.required],
      aadhaarNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      role: ['OFFICER',],
      age: ['', [Validators.required, Validators.min(1)]],
    });
  }

  

  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    

    const formData = this.registerForm.value;

    if (formData.role === 'OFFICER') {
      // Officer Registration
      this.auth.register(formData).subscribe({
        next: () => {
          this.successMessage = 'Officer registration successful! Please login.';
          this.errorMessage = '';
          this.router.navigate(['/officer-login']);
        },
        error: (err) => {
          console.error('❌ Officer registration error:', err);
          this.errorMessage = 'Officer registration failed. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      // User Registration
      this.auth.register(formData).subscribe({
        next: () => {
          this.successMessage = 'User registration successful! Please login.';
          this.errorMessage = '';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('❌ User registration error:', err);
          this.errorMessage = 'User registration failed. Please try again.';
          this.successMessage = '';
        }
      });
    }
  }
}
