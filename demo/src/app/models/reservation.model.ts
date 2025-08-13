// src/app/models/reservation.model.ts



export interface Reservation {
  id?: number;
  espace: any; // Remplace 'any' par 'Espace' si tu as déjà un type pour les espaces
  dateDebut: string;
  dateFin: string;
}
