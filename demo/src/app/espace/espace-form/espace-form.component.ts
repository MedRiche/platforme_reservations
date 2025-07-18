import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EspaceService } from '../../services/espace.service';

@Component({
  selector: 'app-espace-form',
  standalone: false,
  templateUrl: './espace-form.component.html',
  styleUrls: ['./espace-form.component.css']
})
export class EspaceFormComponent implements OnInit {
  espaceForm!: FormGroup;
  espaceId: string | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private espaceService: EspaceService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.espaceForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      capacite: [0, [Validators.required, Validators.min(1)]],
      localisation: ['', Validators.required],
      disponibilite: [true]
    });

    this.espaceId = this.route.snapshot.paramMap.get('id');
    if (this.espaceId) {
      this.isEdit = true;
      this.espaceService.getEspaceById(this.espaceId).subscribe({
        next: espace => this.espaceForm.patchValue(espace),
        error: err => console.error('Erreur chargement espace:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.espaceForm.valid) {
      const action = this.isEdit
        ? this.espaceService.updateEspace(this.espaceId!, this.espaceForm.value)
        : this.espaceService.ajouterEspace(this.espaceForm.value);

      action.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEdit ? '✅ Espace modifié avec succès !' : '✅ Espace ajouté avec succès !',
            'Fermer',
            { duration: 3000 }
          );
          this.router.navigate(['/admin/espaces']);
        },
        error: err => {
          console.error('Erreur:', err);
          alert(this.isEdit ? '❌ Échec de la modification' : '❌ Échec de l\'ajout');
        }
      });
    }
  }
}
