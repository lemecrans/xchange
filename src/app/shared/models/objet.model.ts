import { Utilisateur } from './utilisateur.model';

export class Objet {
    id?: number;
    nom: string;
    description: string;
    valeur: number;
    proprietaire: Utilisateur;
    disponible: boolean;
    image: string;
  
    constructor(
      id: number,
      nom: string,
      description: string,
      valeur: number,
      proprietaire: Utilisateur,
      disponible: boolean,
      image: string
    ) {
      this.id = id;
      this.nom = nom;
      this.description = description;
      this.valeur = valeur;
      this.proprietaire = proprietaire;
      this.disponible = disponible;
      this.image = image;
    }
  }