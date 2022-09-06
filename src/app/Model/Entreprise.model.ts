import { Offres } from "./Offres.model";

export class Entreprise {

    constructor(
        public id?: number,
        public nom?: string,
        public mdp?: string,
        public email?: string,
        public etat?: number,
        public logo?: String,
        public date?: String,
        public numeroTel?: String,
        public localisation?: String,
        public site?: String,
        public offre: Offres[] = []
    ) {
    }
}
