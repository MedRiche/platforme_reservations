import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Espace {
  _id?: string;
  nom: string;
  type: string;
  capacite: number;
  localisation: string;
  disponibilite?: boolean;
  description: string;
  prixParHeure: number;
}

@Injectable({
  providedIn: 'root'
})
export class EspaceService {
  private apiUrl = 'http://localhost:3000/api/espaces';

  constructor(private http: HttpClient) {}

  getEspaces(): Observable<Espace[]> {
    return this.http.get<Espace[]>(this.apiUrl);
  }

 
getEspaceById(id: string): Observable<Espace> {
  return this.http.get<Espace>(`${this.apiUrl}/${id}`);
}





  // ✅ méthode avec token pour admin
  createEspace(espace: Espace): Observable<Espace> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Espace>(this.apiUrl, espace, { headers });
  }

updateEspace(id: string, data: any) {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

deleteEspace(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
  ajouterEspace(data: Espace): Observable<Espace> {
  return this.http.post<Espace>(this.apiUrl, data);
}

 getAllEspaces(): Observable<Espace[]> {
  return this.http.get<Espace[]>(`${this.apiUrl}`);
}



}
