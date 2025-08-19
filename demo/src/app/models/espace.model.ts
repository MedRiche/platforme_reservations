import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Espace {
  _id?: string;
  nom: string;
  type: string;
  capacite: number;
  localisation: string;
  disponibilite?: boolean;
  prixParHeure: number;
  description: string;
  entreprise?: string; // Ajouté pour l'entreprise
  image?: string; // Champ pour l'URL de l'image
}
