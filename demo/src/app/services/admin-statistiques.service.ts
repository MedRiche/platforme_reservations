// src/app/services/admin-statistiques.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminStatistiquesService {
  private apiUrl = 'http://localhost:3000/api/admin/statistiques';

  constructor(private http: HttpClient) {}

  getStatistiques(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
