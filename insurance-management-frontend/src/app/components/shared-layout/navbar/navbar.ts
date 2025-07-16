import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  constructor(public auth: Auth, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return this.auth.getUserRole();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getUserInitial(): string {
    const name = this.auth.getValueFormLocalStorage("name");
    return name ? name.split(' ')[0][0].toUpperCase() : '?';
  }

}
