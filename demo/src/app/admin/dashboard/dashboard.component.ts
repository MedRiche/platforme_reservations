import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AdminStatistiquesService } from '../../services/admin-statistiques.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent  implements OnInit {

  stats: any;
  loading = true;
  error = '';

  constructor(private router: Router,
    private statsService: AdminStatistiquesService
  ) {}


ngOnInit() {
    this.statsService.getStatistiques().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.loading = false;
      }
    });
  }


  redirigerVersEspaces() {
    this.router.navigate(['/admin/esp']);
  }
  
  redirigerVersReservations() {
    this.router.navigate(['/admin/reservations']);
  }
}
