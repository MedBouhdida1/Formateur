export class Entreprise {

    constructor(
        public id?: number | undefined | null,
        public nom?: string | null,
        public mdp?: string,
        public email?: string,
        public etat?: number,
        public logo?: String | null
    ) {
    }
}
