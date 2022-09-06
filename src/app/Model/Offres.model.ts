import { Entreprise } from "./Entreprise.model";

export class Offres {

    constructor(
        public id?: number,
        public titre?: string,
        public salaire?: string,
        public type?: string,
        public etat?: number,
        public description?: string,
        public nbrPersonnes?: number,
        public genre?: string,
        public langue?: string,
        public dateExpir?: string,
        public datePub?: string,
        public niveau?: string,
        public requirements?: String,
        public experience?: String,
        public entreprise?: Entreprise,
    ) {

    }
}