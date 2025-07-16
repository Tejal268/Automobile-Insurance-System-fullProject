import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  registerForm: FormGroup;
  emailError: string = '';
  otherError: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['USER'],
      address: ['', Validators.required],
      aadhaarNumber: ['', Validators.required,Validators.minLength(12)],
      panNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
    });
  }

  register(): void {
    this.emailError = '';
    this.otherError = '';

    if (this.registerForm.invalid) {
      this.otherError = 'Please fill all fields correctly';
      return;
    }

    const formData = this.registerForm.value;
    const apiCall = formData.role === 'OFFICER'
      ? this.auth.registerOfficer(formData)
      : this.auth.register(formData);

    apiCall.subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => this.successMessage = '', 3000); // auto-hide after 3s
        this.router.navigate([formData.role === 'OFFICER' ? '/officer-login' : '/login']);
      },
      error: (err) => {
        console.error('❌ Registration error:', err);
        if (err.status === 400 && err.error?.message?.includes('Email already exists')) {
          this.emailError = 'Email already exists';
        } else {
          this.otherError = 'Registration failed. Please try again later.';
        }
      }
    });
  }
}
