export interface Espace {
  id: string;                // Identifiant unique
  nom: string;               // Nom de l'espace
  description: string;       // Description courte
  capacite: number;          // Capacité d'accueil
  disponibilite: boolean;    // Disponible ou non
  prixParHeure?: number;     // Optionnel : prix à l'heure
  localisation?: string;     // Optionnel : lieu ou adresse
  type?: string;             // Optionnel : type d'espace (bureau, salle réunion, etc.)
}
