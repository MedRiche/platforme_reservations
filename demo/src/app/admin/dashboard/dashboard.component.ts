// src/app/admin/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminStatistiquesService } from '../../services/admin-statistiques.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import 'chart.js/auto'; // important pour chart.js v4

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = null;
  loading = true;
  error = '';

  // Donut (doughnut) chart configuration
  public donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'] }]
  };

  // Bar chart configuration (top espaces)
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ label: 'Réservations', data: [], backgroundColor: '#4BC0C0' }]
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  constructor(private router: Router, private statsService: AdminStatistiquesService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';
    this.statsService.getStatistiques().subscribe({
      next: (data) => {
        this.stats = data || {};
        // Remplir donut
        this.donutChartData.labels = (data.reservationsParStatut || []).map((s: any) => s._id);
        this.donutChartData.datasets[0].data = (data.reservationsParStatut || []).map((s: any) => s.count);

        // Remplir bar
        this.barChartData.labels = (data.topEspaces || []).map((e: any) => e.nom);
        this.barChartData.datasets[0].data = (data.topEspaces || []).map((e: any) => e.count);

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur statistiques:', err);
        this.error = 'Erreur lors du chargement des statistiques.';
        this.loading = false;
      }
    });
  }

  redirigerVersEspaces(): void {
    this.router.navigate(['/admin/esp']);
  }

  redirigerVersReservations(): void {
    this.router.navigate(['/admin/reservations']);
  }
  redirigerVersUtilisateurs(): void {
    this.router.navigate(['/admin/users']);
  }

  
}
