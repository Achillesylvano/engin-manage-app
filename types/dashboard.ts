export interface Engin {
  id: string;
  nom: string;
  type: 'Tracteur' | 'Pelle' | 'Camion' | 'Grue' | 'Bulldozer';
  status: 'parc' | 'sorti' | 'retour';
}

export interface Mouvement {
  id: string;
  enginNom: string;
  type: 'sortie' | 'retour';
  heure: string;
  site: string;
  compteurHeures?: number;
  compteurKm?: number;
  carburant?: number;
  agent: string;
}

export interface Statistiques {
  enginsParc: number;
  enginsSortisAujourd: number;
  enginsActuellementSortis: number;
  enginsRetournes: number;
  mouvementsAgent: number;
}