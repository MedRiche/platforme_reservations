import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AdminReservationService } from '../../services/admin-reservation.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'fr',
    events: [] // sera rempli dynamiquement
  };

  constructor(private adminService: AdminReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.adminService.getAllReservations().subscribe({
      next: (reservations: any[]) => {
        this.calendarOptions.events = reservations.map(res => ({
          title: `Espace: ${res.espaceId?.nom || res.espace?.nom} - ${res.userId?.name || res.utilisateur?.nom }`,
          start: res.dateDebut,
          end: res.dateFin,
          color: '#4CAF50' // couleur verte pour différencier
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations', err);
      }
    });
  }
}
