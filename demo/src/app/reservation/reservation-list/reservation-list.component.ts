import { Component, OnInit } from '@angular/core';
import { ReservationService, Reservation } from '../../services/reservation.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Espace } from '../../services/espace.service';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  message = '';
  reservations: Reservation[] = [];
  selectedReservation: Reservation | null = null;
  showModal = false;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getMyReservations().subscribe({
      next: (data) => {
        this.reservations = data;

        const events = data.map((r) => ({
          id: r._id!,
          title: this.getEspaceNom(r.espace),
          start: r.dateDebut,
          end: r.dateFin,
          backgroundColor:
            r.statut === 'confirmée'
              ? '#28a745'
              : r.statut === 'en attente'
              ? '#ffc107'
              : '#dc3545',
          extendedProps: { ...r } // on met toute la réservation
        }));

        this.calendarOptions = { ...this.calendarOptions, events };
      },
      error: (err) => {
        this.message = 'Erreur lors du chargement des réservations.';
        console.error(err);
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.selectedReservation = {
      _id: clickInfo.event.id,
      ...(clickInfo.event.extendedProps as any)
    } as Reservation;

    this.showModal = true;
  }

  annulerReservation(id: string) {
    if (!confirm('Voulez-vous vraiment annuler cette réservation ?')) return;

    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        this.message = 'Réservation annulée avec succès.';
        this.showModal = false;
        this.loadReservations();
      },
      error: (err) => {
        console.error('Erreur lors de l’annulation :', err);
        this.message = "Erreur lors de l’annulation.";
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedReservation = null;
  }

  getEspaceNom(espace: any): string {
    return typeof espace === 'object' && espace !== null && 'nom' in espace
      ? (espace as Espace).nom
      : espace;
  }
}
