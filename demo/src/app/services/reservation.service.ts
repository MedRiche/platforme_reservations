import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Espace {
  _id: string;
  nom: string;
  type: string;
  capacite: number;
  localisation: string;
  disponibilite?: boolean;
  description: string;
  prixParHeure: number;
  entreprise?: string; // Ajouté pour l'entreprise
}

export interface Reservation {
  _id?: string;
  utilisateur?: string;
  espace: string | Espace; // <-- bien vu ici
  dateDebut: Date | string;
  dateFin: Date | string;
  statut?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations'; // ⚠️ ajuste selon ton backend

  constructor(private http: HttpClient) {}

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return { headers };
  }

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


  getReservationsByUser(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3000/api/reservations/user/${userId}`);
}

getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }


  // nouvelles méthodes :
  getReservationsByEspace(espaceId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/espace/${espaceId}`);
  }



}
