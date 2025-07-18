import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspaceService } from '../../../services/espace.service';
import { Espace } from '../../../models/espace.model';

@Component({
  selector: 'app-list-admin',
  standalone: false,  
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  espaces: Espace[] = [];

  constructor(private espaceService: EspaceService, private router: Router) {}

  ngOnInit(): void {
    this.getEspaces();
  }

  getEspaces(): void {
this.espaceService.getAllEspaces().subscribe({
  next: (data) => {
    console.log('Espaces récupérés :', data); // ← tu devrais voir les données ici
    this.espaces = data;
  },
  error: (err) => {
    console.error('Erreur lors du chargement des espaces', err);
  }
});
  }

  onEdit(espaceId: string): void {
    this.router.navigate(['/admin/update-espace', espaceId]);
  }

  onDelete(espaceId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet espace ?')) {
      this.espaceService.deleteEspace(espaceId).subscribe({
        next: () => {
          this.espaces = this.espaces.filter(e => e._id !== espaceId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'espace', err);
        }
      });
    }
  }

  onAdd(): void {
    this.router.navigate(['/admin/espace-form']);
  }
}
