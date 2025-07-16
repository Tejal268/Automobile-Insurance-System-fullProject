import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: true,
  
  imports: [CommonModule,RouterLink], // ✅ Include CommonModule here
})
export class Sidebar {
  constructor(private auth: Auth, private router: Router) {}

  isSidebarOpen = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getRole(): string | null {
    return this.auth.getUserRole();
  }

  isOfficer(): boolean {
    // @ts-ignore
    return this.auth.getValueFormLocalStorage("isOfficer") === 'true';
    // Or if stored as string: === 'true'
  }
}
