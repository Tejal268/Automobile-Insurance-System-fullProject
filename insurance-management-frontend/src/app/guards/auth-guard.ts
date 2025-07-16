import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

 canActivate(): boolean {
  const token = this.auth.getToken();
  console.log('Checking AuthGuard. Token:', token);

  if (token) {
    return true;
  } else {
    this.router.navigate(['/login']);
    return false;
  }
}

}
