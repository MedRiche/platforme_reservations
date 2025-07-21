import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profil']);
  }

  goToReservations() {
    this.router.navigate(['/mes-reservations']);
  }
}
