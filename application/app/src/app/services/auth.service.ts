import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  private readonly tokenKey = 'authToken';
  private readonly roleKey = 'userRole';
  private readonly users = [
    { username: 'user@patient.com', password: '1234', role: 'patient' },
    { username: 'user@student.com', password: '1234', role: 'student' }
  ];
  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.tokenKey, 'dummy-token');
      localStorage.setItem(this.roleKey, user.role);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);

  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }
}
