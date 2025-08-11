import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  _id: string;
  utilisateur: { nom: string; email: string };
  espace: { nom: string; type: string; localisation: string };
  dateDebut: string;
  dateFin: string;
  statut: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminReservationService {
  private apiUrl = 'http://localhost:3000/api/admin/reservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

 confirmerReservation(id: string): Observable<any> {
   return this.http.patch(`${this.apiUrl}/${id}/confirmer`, {});
  }

  annulerReservation(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/annuler`, {});
  }


}
