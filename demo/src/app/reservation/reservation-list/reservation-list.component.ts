import { Component, OnInit } from '@angular/core';
import { ReservationService, Reservation } from '../../services/reservation.service';
import { Espace } from '../../services/espace.service';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  message = '';

  constructor(private reservationService: ReservationService
    
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getMyReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        this.message = 'Erreur lors du chargement des réservations.';
        console.error(err);
      }
    });
  }

  annulerReservation(id: string): void {
    if (confirm('Confirmer l’annulation de cette réservation ?')) {
      this.reservationService.cancelReservation(id).subscribe({
        next: () => {
          this.message = 'Réservation annulée.';
          this.getReservations(); // Rafraîchir la liste
        },
        error: (err) => {
          console.error(err);
          this.message = 'Erreur lors de l’annulation.';
        }
      });
    }
  }


  isEspaceObject(espace: any): espace is Espace {
  return espace && typeof espace === 'object' && 'nom' in espace;
}

getEspaceNom(espace: any): string {
  return typeof espace === 'object' && espace !== null && 'nom' in espace
    ? espace.nom
    : espace;
}

}
