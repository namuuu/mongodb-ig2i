interface Talent {
    code_talent: number;
    code_competence: number;
    niveau_experience: number;
}

interface Service {
    code_service: number;
    code_membre: number;
    description: string;
    valorisation: number;
    date_debut: string;
    date_fin: string;
    code_talent: number;
    tags: string[];
}

interface Transaction {
    code_transaction: number;
    etat: string;
    services: Service[];
    date_effective: string;
    date_previsionnelle: string;
    valorisation_theorique: number;
    valorisation_effective: number;
    comments: Comments[];
}

interface Comments {
    code_comment: string;
    code_membre: number;
    message: string;
    comments: Comments[];
}

interface Member {
    code_membre: number;
    nom: string;
    prenom: string;
    mail: string;
    compteTemps: number;
    talents: Talent[];
    cotisations?: Cotisation[];
}

interface Cotisation {
    date_encaissement: string;
    annee: number;
}


