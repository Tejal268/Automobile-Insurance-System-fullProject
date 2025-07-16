import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl = 'http://localhost:9999/api/auth'; 

  constructor(private http: HttpClient) { }

  // Login API - expects token as plain text
  login(email: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { responseType: 'text' });
  }

  // RegisterOfficer API for users only
  register(user: any): Observable<any> {
    return this.http.post('http://localhost:9999/api/users/register', user);
  }

// Auth service
registerOfficer(officer: any): Observable<string> {
  return this.http.post('http://localhost:9999/api/officer/register', officer, { responseType: 'text' });
}

  // Save JWT token to local storage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveIntoLocalStorage(key: String, value: String): void {
    // @ts-ignore
    localStorage.setItem(key, value);
  }
  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getValueFormLocalStorage(key: String){
    // @ts-ignore
    return localStorage.getItem(key);
  }
  // Save role to local storage
  saveUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  // Get role from local storage
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Save userId to local storage
  saveUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Get userId from local storage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Clear session on logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('')
  }
}
