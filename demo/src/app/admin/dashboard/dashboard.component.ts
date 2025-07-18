import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  redirigerVersEspaces() {
    this.router.navigate(['/admin/esp']);
  }
}
