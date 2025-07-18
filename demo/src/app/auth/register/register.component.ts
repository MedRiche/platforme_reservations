import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom = '';
  email = '';
  motDePasse = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.motDePasse !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const data = {
      nom: this.nom,
      email: this.email,
      motDePasse: this.motDePasse
    };

    this.authService.register(data).subscribe({
      next: (_res: any) => {
        this.success = 'Inscription réussie !';
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Erreur lors de l’inscription.';
      }
    });
  }
}
