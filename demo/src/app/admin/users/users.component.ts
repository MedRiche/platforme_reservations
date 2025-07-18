import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [
    { id: 1, email: 'user1@example.com', role: 'utilisateur' },
    { id: 2, email: 'admin@example.com', role: 'admin' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Tu pourras plus tard remplacer ça par un appel API
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}
