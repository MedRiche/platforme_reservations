import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  motDePasse = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const data = { email: this.email, motDePasse: this.motDePasse };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token); // facultatif
        const role = res.user?.role;

        // 🔁 Redirection selon rôle
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/espaces']);
        }
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Erreur de connexion.';
      }
    });
  }
}
