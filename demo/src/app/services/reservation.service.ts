import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:5000/api/reservations'; // adapte l'URL

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createReservation(data: any): Observable<any> {
    return this.http.post(API_URL, data, this.getHeaders());
  }

  getUserReservations(): Observable<any> {
    return this.http.get(API_URL + '/me', this.getHeaders());
  }

  cancelReservation(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, this.getHeaders());
  }
}
