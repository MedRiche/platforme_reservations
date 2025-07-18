import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspaceService, Espace } from '../../services/espace.service';


@Component({
  selector: 'app-espace-list',
  standalone: false,
   
  templateUrl: './espace-list.component.html',
  styleUrls: ['./espace-list.component.css']
})
export class EspaceListComponent implements OnInit {
  espaces: Espace[] = [];

  constructor(private espaceService: EspaceService) {}

 ngOnInit(): void {
  this.getEspaces();
}

getEspaces() {
  this.espaceService.getEspaces().subscribe({
    next: (data: Espace[]) => {
      this.espaces = data;
    },
    error: (err: any) => {
      console.error('Erreur récupération des espaces', err);
    }
  });
}
}

