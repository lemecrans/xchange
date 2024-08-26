import { Utilisateur } from './utilisateur.model';
import { Objet } from './objet.model';

export interface PropositionEchange {
  id: number;
  proposant: Utilisateur;
  destinataire: Utilisateur;
  dateProposition: Date;  
  latitude: number;      
  longitude: number;    
  etat: string;
  objetsEchanges: any;
}