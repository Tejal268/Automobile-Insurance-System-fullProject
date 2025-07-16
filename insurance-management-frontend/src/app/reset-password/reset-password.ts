import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
 resetForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onResetPassword(): void {
    if (this.resetForm.invalid) return;

    this.http
      .post('http://localhost:9999/api/auth/reset-password', this.resetForm.value, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message = response;
          this.resetForm.reset();
        },
        error: (err) => {
          this.message = err.error || 'Failed to reset password.';
        },
      });
  }
}
