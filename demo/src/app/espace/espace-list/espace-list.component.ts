// src/app/espace/espace-list/espace-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EspaceService, Espace } from '../../services/espace.service';
import { ReservationService } from '../../services/reservation.service';

import { CalendarOptions, DateSelectArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-espace-list',
  standalone: false,
  templateUrl: './espace-list.component.html',
  styleUrls: ['./espace-list.component.css']
})
export class EspaceListComponent implements OnInit {
  espaces: Espace[] = [];
  filteredEspaces: Espace[] = [];

  filtreEntreprise = '';
  filtreType = '';

  selectedEspace: Espace | null = null;
  showSidebar = false;

  reservation = { date: '', heureDebut: '', heureFin: '' };
  message = '';



  // Ajoute ces variables dans ta classe
imageModalVisible = false;
imageToShow: string | null = null;


  // FullCalendar options
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    selectMirror: true,
    select: this.handleDateSelect.bind(this),
    events: []
  };

  constructor(
    private espaceService: EspaceService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.getEspaces();
  }

  getEspaces() {
    this.espaceService.getEspaces().subscribe({
      next: (data) => {
        this.espaces = data;
        this.filteredEspaces = data;
      },
      error: (err) => console.error('Erreur récupération des espaces', err)
    });
  }

  applyFilter(): void {
    this.filteredEspaces = this.espaces.filter(espace => {
      const matchEntreprise = this.filtreEntreprise ? (espace.entreprise || '').toLowerCase().includes(this.filtreEntreprise.toLowerCase()) : true;
      const matchType = this.filtreType ? espace.type === this.filtreType : true;
      return matchEntreprise && matchType;
    });
  }

  openDetails(espace: Espace) {
    this.selectedEspace = espace;
    this.message = '';
    // charger les réservations de cet espace et les afficher dans le calendar
    this.reservationService.getReservationsByEspace(espace._id!).subscribe({
      next: (resvs) => {
        const events = resvs.map((r: any) => ({
          id: r._id,
          title: r.statut === 'confirmée' ? 'Réservé' : 'En attente',
          start: r.dateDebut,
          end: r.dateFin,
          color: r.statut === 'confirmée' ? '#28a745' : '#ffbf00'
        }));
        this.calendarOptions = {
          ...this.calendarOptions,
          events
        };
      },
      error: (err) => {
        console.error('Erreur chargement réservations espace', err);
        this.calendarOptions = { ...this.calendarOptions, events: [] };
      }
    });
  }



  closeDetails() {
    this.selectedEspace = null;
    this.reservation = { date: '', heureDebut: '', heureFin: '' };
    this.calendarOptions = { ...this.calendarOptions, events: [] };
  }


// Ouvre le modal avec l’image
openImageModal(espace: Espace) {
  if (espace.image) {
    this.imageToShow = `http://localhost:3000${espace.image}`;
    this.imageModalVisible = true;
  } else {
    alert("⚠️ Cet espace n'a pas d'image.");
  }
}

// Fermer le modal
closeImageModal() {
  this.imageModalVisible = false;
  this.imageToShow = null;
}

// select handler from FullCalendar (user selects a range)
handleDateSelect(selectInfo: DateSelectArg) {
  if (!this.selectedEspace) {
    alert('Ouvrez d\'abord les détails d\'un espace.');
    return;
  }

  const start = selectInfo.start;
  const end = selectInfo.end;

  const now = new Date();

  // 🟢 Vérifier si la date choisie est avant aujourd'hui
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  if (start < todayMidnight) {
    alert("⚠️ Impossible de réserver une date passée.");
    this.message = "❌ Vous ne pouvez pas réserver dans le passé.";
    return;
  }

  // 🟢 Vérifier si aujourd'hui et l'heure choisie est déjà passée
  const isSameDay =
    start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();

  if (isSameDay && start < now) {
    alert("⚠️ Impossible de réserver une heure déjà écoulée aujourd'hui.");
    this.message = "❌ Vous ne pouvez pas réserver dans le passé.";
    return;
  }

  // Pré-remplissage simple : date et heures
  const yyyy = start.getFullYear();
  const mm = String(start.getMonth() + 1).padStart(2, '0');
  const dd = String(start.getDate()).padStart(2, '0');
  this.reservation.date = `${yyyy}-${mm}-${dd}`;

  const pad = (d: number) => String(d).padStart(2, '0');
  this.reservation.heureDebut = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  this.reservation.heureFin = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

  if (confirm(`Réserver le créneau ${this.reservation.date} ${this.reservation.heureDebut} → ${this.reservation.heureFin} ?`)) {
    this.createReservationFromSelection();
  }
}


  createReservationFromSelection(): void {
  if (!this.reservation.date || !this.reservation.heureDebut || !this.reservation.heureFin || !this.selectedEspace) {
    this.message = '❌ Veuillez remplir tous les champs.';
    return;
  }

  const dateDebut = new Date(`${this.reservation.date}T${this.reservation.heureDebut}`);
  const dateFin = new Date(`${this.reservation.date}T${this.reservation.heureFin}`);
  const now = new Date();

  // Vérifier si la date est passée
  if (dateDebut < now) {
    this.message = "❌ Vous ne pouvez pas réserver dans le passé.";
    
    return;
  }

  // Vérifier si aujourd'hui et heure déjà dépassée
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd d'aujourd'hui
  if (this.reservation.date === today && dateDebut.getTime() < now.getTime()) {
    this.message = "❌ L'heure choisie est déjà passée.";
    return;
  }

  // Vérifier si heure fin > heure début
  if (dateFin <= dateDebut) {
    this.message = "❌ L'heure de fin doit être après l'heure de début.";
    return;
  }



  

  const payload = {
    espace: this.selectedEspace._id!,
    dateDebut,
    dateFin
  };

  this.reservationService.createReservation(payload).subscribe({
    next: () => {
      this.message = '✅ Réservation confirmée et email envoyé';
    },
    error: () => {
      this.message = '❌ Erreur lors de la réservation';
    }
  });
}



  // bouton du sidebar
  toggleSidebar() { this.showSidebar = !this.showSidebar; }
}
