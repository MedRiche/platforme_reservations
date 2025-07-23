import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm!: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser(); // doit contenir _id, nom, email...
    if (this.user) {
      this.profileForm = this.fb.group({
        nom: [this.user.nom, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]]
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.user._id, this.profileForm.value).subscribe({
        next: (response) => {
          alert('Profil mis à jour avec succès.');
        },
        error: (error) => {
          console.error(error);
          alert("Erreur lors de la mise à jour.");
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
