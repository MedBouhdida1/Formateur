import { Offres } from "./Offres.model";

export class Entreprise {

    constructor(
        public id?: number | undefined | null,
        public nom?: string | null,
        public mdp?: string,
        public email?: string,
        public etat?: number,
        public logo?: String | null,
        public date?: String,
        public numeroTel?: String,
        public offre?: Offres[]
    ) {
    }
}
