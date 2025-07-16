import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/shared-layout/navbar/navbar';
import { Sidebar } from './components/shared-layout/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar,Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const noLayoutPages = ['/', '/login', '/register', '/officer-login', '/officer-register', '/forgot-password'];
    return noLayoutPages.includes(this.router.url);
  }
}
