import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  template: `
    <h2>Dashboard Administrateur</h2>
    <button (click)="redirigerVersEspaces()">Gérer les Espaces</button>
  `,
})
export class DashboardComponent {
  constructor(private router: Router) {}

  redirigerVersEspaces() {
    this.router.navigate(['/admin/espaces']);
  }
}
