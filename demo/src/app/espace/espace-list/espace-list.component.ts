import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspaceService, Espace } from '../../services/espace.service';
import { ReservationService } from '../../services/reservation.service';


@Component({
  selector: 'app-espace-list',
  standalone: false,
   
  templateUrl: './espace-list.component.html',
  styleUrls: ['./espace-list.component.css']
})
export class EspaceListComponent implements OnInit {
  espaces: Espace[] = [];
  filteredEspaces:  any[] = []; // espaces affichés après filtrage

  filtreEntreprise: string = '';
  filtreType: string = '';

  selectedEspace: Espace | null = null;

reservation = {
  date: '',
  heureDebut: '',
  heureFin: ''
};

  constructor(  private espaceService: EspaceService,
  private reservationService: ReservationService) {}

 ngOnInit(): void {
  this.getEspaces();
}

getEspaces() {
  this.espaceService.getEspaces().subscribe({
    next: (data: Espace[]) => {
      this.espaces = data;
      this.filteredEspaces = data; // Initialiser les espaces filtrés avec tous les espaces
    },
    error: (err: any) => {
      console.error('Erreur récupération des espaces', err);
    }
  });
}

  applyFilter(): void {
    this.filteredEspaces = this.espaces.filter((espace) => {
      const matchEntreprise = this.filtreEntreprise
        ? espace.entreprise?.toLowerCase().includes(this.filtreEntreprise.toLowerCase())
        : true;

      const matchType = this.filtreType
        ? espace.type === this.filtreType
        : true;

      return matchEntreprise && matchType;
    });
  }

  openDetails(espace: Espace) {
  this.selectedEspace = espace;
}

closeDetails() {
  this.selectedEspace = null;
  this.reservation = { date: '', heureDebut: '', heureFin: '' };
}

reserver() {
  if (this.selectedEspace && this.reservation.date && this.reservation.heureDebut && this.reservation.heureFin) {
    const dateDebut = new Date(`${this.reservation.date}T${this.reservation.heureDebut}`);
    const dateFin = new Date(`${this.reservation.date}T${this.reservation.heureFin}`);

    const payload = {
  espace: this.selectedEspace._id!, // <-- le "!" force TypeScript à accepter
  dateDebut,
  dateFin
};

    this.reservationService.createReservation(payload).subscribe({
      next: () => {
        alert('✅ Réservation enregistrée !');
        this.closeDetails();
      },
      error: (err) => {
        alert('❌ Erreur : ' + err.error.message);
        console.error(err);
      }
    });
  } else {
    alert('❗️ Veuillez remplir tous les champs de réservation.');
  }
}

}

