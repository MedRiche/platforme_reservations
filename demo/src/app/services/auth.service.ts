import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // mets l'URL de ton backend

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, motDePasse: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(data: { nom: string, email: string, motDePasse: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (e) {
      return null;
    }
  }


saveUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

getUser(): any {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}


getUserFromToken(): any {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      nom: payload.nom,
      email: payload.email,
      role: payload.role
    };
  } catch (e) {
    return null;
  }
}


updateUser(userId: string, data: any): Observable<any> {
  return this.http.put<any>(`http://localhost:3000/api/users/${userId}`, data);
}

getUserId(): string {
  const token = localStorage.getItem('token');
  if (!token) return '';
  
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id;
}


updateProfile(userId: string, data: any) {
  return this.http.put<any>(`http://localhost:3000/api/users/${userId}`, data);
}

}
