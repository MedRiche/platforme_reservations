import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  _id?: string;
  utilisateur?: string;
  espace: string;
  dateDebut: Date;
  dateFin: Date;
  statut?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations'; // ⚠️ ajuste selon ton backend

  constructor(private http: HttpClient) {}

  // ➕ Créer une réservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}`, reservation);
  }

  // 📄 Récupérer les réservations de l'utilisateur connecté
  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/mes-reservations`);
  }

  // ❌ Annuler une réservation
  cancelReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
