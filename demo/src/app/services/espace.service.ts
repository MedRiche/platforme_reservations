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
  entreprise?: string; // Ajouté pour l'entreprise
  image?: string; // Champ pour l'image
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



deleteEspace(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
 

 getAllEspaces(): Observable<Espace[]> {
  return this.http.get<Espace[]>(`${this.apiUrl}`);
}

ajouterEspace(data: any, file?: File): Observable<Espace> {
  const formData = new FormData();

  // append tous les champs
  Object.keys(data).forEach(key => {
    formData.append(key, (data as any)[key]);
  });

  // append image si existe
  if (file) {
    formData.append('image', file, file.name);
  }

  return this.http.post<Espace>(this.apiUrl, formData);
}

updateEspace(id: string, data: any, file?: File): Observable<Espace> {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    formData.append(key, (data as any)[key]);
  });

  if (file) {
    formData.append('image', file, file.name);
  }

  return this.http.put<Espace>(`${this.apiUrl}/${id}`, formData);
}




}
