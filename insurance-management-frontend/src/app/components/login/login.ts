import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Auth} from '../../services/auth';
import {parseJson} from '@angular/cli/src/utilities/json-file';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {
  }

  //  Decode JWT without external libraries
  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1]; // JWT format: header.payload.signature
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  login(): void {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  const { username, password } = this.userForm.value;

  this.auth.login(username, password).subscribe({
    next: (userData: string) => {
      const parsed = JSON.parse(userData);
      this.auth.saveIntoLocalStorage("token", parsed.token);
      this.auth.saveIntoLocalStorage("userId", parsed.id);
      this.auth.saveIntoLocalStorage("email", parsed.email);
      this.auth.saveIntoLocalStorage("isOfficer", parsed.isOfficer);
      this.auth.saveIntoLocalStorage("name", parsed.name);

      if (parsed.isOfficer) {
        this.router.navigate(['/officer-dashboard']);
      } else {
        this.router.navigate(['/user-dashboard']);
      }
    },
    error: (error) => {
      console.error('Login Error:', error);

      const errorMessage = error.error;

      if (errorMessage === 'EMAIL_NOT_FOUND') {
        this.userForm.controls['username'].setErrors({ notFound: true });
      } else if (errorMessage === 'WRONG_PASSWORD') {
        this.userForm.controls['password'].setErrors({ wrongPassword: true });
      } else {
        this.errorMessage = 'Invalid usernam and password. Try again .';
      }
    }
  });
}

goToForgotPassword(): void {
  this.router.navigate(['/forgot-password']);
}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToOfficerRegister(): void {
    this.router.navigate(['/officer-register']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
