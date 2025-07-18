import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspaceService } from '../../../services/espace.service';
import { Espace } from '../../../models/espace.model';

@Component({
  selector: 'app-update-espace',
  standalone: false,
  templateUrl: './update-espace.component.html',
  styleUrls: ['./update-espace.component.css']
})
export class UpdateEspaceComponent implements OnInit {
  espaceForm!: FormGroup;
  espaceId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private espaceService: EspaceService
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID depuis l'URL
    this.espaceId = this.route.snapshot.paramMap.get('id') || '';

    // Initialisation du formulaire
    this.espaceForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      capacite: [0, Validators.required],
      disponibilite: [true, Validators.required],
      prixParHeure: [0, Validators.required],
      localisation: ['', Validators.required],
      type: ['', Validators.required]
    });

    // Récupération des données de l'espace par ID
    this.espaceService.getEspaceById(this.espaceId).subscribe(
      (data: Espace) => {
        this.espaceForm.patchValue({
          nom: data.nom,
          description: data.description,
          capacite: data.capacite,
          disponibilite: data.disponibilite,
          prixParHeure: data.prixParHeure,
          localisation: data.localisation,
          type: data.type
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de l’espace :', error);
      }
    );
  }

onSubmit(): void {
  if (this.espaceForm.valid) {
    this.espaceService.updateEspace(this.espaceId, this.espaceForm.value).subscribe(
      () => {
        alert('✅ Espace mis à jour avec succès');
        this.router.navigate(['/admin/list-espaces']); // ✅ redirection correcte ici
      },
      (error) => {
        console.error('❌ Erreur lors de la mise à jour :', error);
      }
    );
  }
}
  onCancel(): void {
    this.router.navigate(['/admin/list-espaces']); // ✅ redirection correcte ici
  }
}
