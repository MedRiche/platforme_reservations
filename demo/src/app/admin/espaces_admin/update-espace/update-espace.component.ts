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

  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  currentImage: string | null = null; // garder l’image actuelle

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private espaceService: EspaceService
  ) {}

  ngOnInit(): void {
    this.espaceId = this.route.snapshot.paramMap.get('id') || '';

    this.espaceForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      capacite: [0, Validators.required],
      disponibilite: [true, Validators.required],
      prixParHeure: [0, Validators.required],
      localisation: ['', Validators.required],
      type: ['', Validators.required],
      entreprise: ['', Validators.required]
      
    });

    this.espaceService.getEspaceById(this.espaceId).subscribe(
      (data: Espace) => {
        this.espaceForm.patchValue({
          nom: data.nom,
          description: data.description,
          capacite: data.capacite,
          disponibilite: data.disponibilite,
          prixParHeure: data.prixParHeure,
          localisation: data.localisation,
          type: data.type,
          entreprise: data.entreprise

        });

        if (data.image) {
          this.currentImage = `http://localhost:3000/public/uploads/${data.image}`; // ⚡ adapte selon ton backend
        }
      },
      (error) => {
        console.error('Erreur lors du chargement de l’espace :', error);
      }
    );
  }

  // ✅ gérer le changement de fichier
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.espaceForm.valid) {
      this.espaceService.updateEspace(this.espaceId, this.espaceForm.value, this.selectedFile).subscribe(
        () => {
          alert('✅ Espace mis à jour avec succès');
          this.router.navigate(['/admin/list-espaces']);
        },
        (error) => {
          console.error('❌ Erreur lors de la mise à jour :', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/list-espaces']);
  }
}
