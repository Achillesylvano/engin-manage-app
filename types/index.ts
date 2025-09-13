export interface User {
  id: number;
  matricule: string;
  name: string;
  email: string;
  role: string;
  role_label: string;
  role_color: string;
}

export interface TypeEngin {
  id: number;
  nom: string;
}

export interface Engin {
  id: number;
  designation: string;
  marque: string;
  modele: string;
  numero_serie: string;
  compteur_h: number;
  compteur_km: number;
  seuil_maintenance_h: number;
  seuil_maintenance_km: number;
  etat: string;
  etat_label: string;
  etat_color: string;
  type_carburant: string;
  type_carburant_label: string;
  carburant_color: string;
  capacite_reservoir: number;
  date_acquisition: string;
  type_engin?: TypeEngin;
}

export interface DailyUsage {
  id: number;
  date_usage: string | null;
  site_destination: string | null;
  observation_depart: string | null;
  heure_sortie: string | null;
  heure_retour: string | null;
  is_returned: boolean;
  compteur_h_sortie: number | null;
  compteur_km_sortie: number | null;
  compteur_h_retour: number | null;
  compteur_km_retour: number | null;
  observation_retour: string | null;
  carburant_rempli_l: number | null;
  engin?: Engin;
  operateur?: User;
  engin_id: number;
  agent_suivi_id: number;
  operateur_id: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface DailyUsageSortie {
  site_destination: string;
  observation_depart: string;
  operateur_id: number;
  engin_id: number;
  date_usage: string;
  heure_sortie: string;
  compteur_h_sortie: number;
  compteur_km_sortie: number;
}
