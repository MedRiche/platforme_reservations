import { Component, OnInit } from '@angular/core';
import { AdminReservationService, Reservation } from '../../../services/admin-reservation.service';

@Component({
  selector: 'app-reservation-admin-list',
  standalone: false,
  templateUrl: './reservation-admin-list.component.html',
  styleUrls: ['./reservation-admin-list.component.css']
})
export class ReservationAdminListComponent implements OnInit {

  reservations: Reservation[] = [];
  message = '';
  loading = true;

  constructor(private adminService: AdminReservationService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.adminService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations', err);
        this.message = 'Impossible de charger les réservations.';
        this.loading = false;
      }
    });
  }

  confirmerReservation(id: string) {
    this.adminService.confirmerReservation(id).subscribe({
    next: () => {
      this.message = 'Réservation confirmée avec succès';
      this.getReservations(); // recharger la liste
    },
    error: (err) => {
      console.error(err);
      this.message = 'Erreur lors de la confirmation.';
    }
  });
}

  annulerReservation(id: string) {
    this.adminService.annulerReservation(id).subscribe({
      next: () => {
        alert('Réservation annulée');
        this.getReservations();
      },
      error: (err) => {
        console.error('Erreur annulation', err);
        alert('Erreur lors de l’annulation.');
      }
    });
  }
}
